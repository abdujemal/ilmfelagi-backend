import got from 'got';
import fs from 'fs/promises';
import fs1 from "fs"
import path from 'path';
import { tmpdir } from 'os';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import mime from 'mime-types';
import B2 from 'backblaze-b2';
import CourseModel from './models/course.model.js';

// FFmpeg setup
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Init B2
const b2 = new B2({
  applicationKeyId: '005d26c9960501f0000000004',
  applicationKey: 'K005JBwA58aKEAALaKlj33at7+kTD34'
});

// Your B2 bucket
const bucketId = 'ed0216dcb979f60085b0011f'; // replace with actual bucket id
const bucketName= 'ilm-Felagi2';
const B2_DOWNLOAD_URL = 'https://b2.ilmfelagi.com/file'; // Replace with your B2 download domain


export const initB2 = async () =>{
    try{
        await b2.authorize();
        console.log('✅ B2 Authorized');
        // const response = await b2.listBuckets();
        // console.log(response.data.buckets);
    }catch(err){
        console.error('❌ B2 Authorization failed:', err.message);
    }
}

export const convertToMp3AndReplace = async (url) => {
  try {
    await b2.authorize(); // authenticate

    const ext = path.extname(url);
    const fileName = decodeURIComponent(path.basename(url));
    const folderName = decodeURIComponent(path.dirname(url).replace(`${B2_DOWNLOAD_URL}/${bucketName}`, '').replace(/^\//, '')); // remove the base URL and leading slash
    
    const isMP3 = ext.toLowerCase() === '.mp3';

    if (isMP3) {
      console.log('File is already MP3. No conversion needed.');
      return;
    }

    const tmpAmrPath = path.join(tmpdir(), fileName);
    const mp3FileName = fileName.replace(ext, '.mp3');
    const tmpMp3Path = path.join(tmpdir(), mp3FileName);

    // Download file
    const downloadStream = got.stream(url);
    const fileBuffer = await fs.writeFile(tmpAmrPath, await streamToBuffer(downloadStream));

    console.log('Downloaded:', tmpAmrPath);

    // Convert to mp3
    await new Promise((resolve, reject) => {
      ffmpeg(tmpAmrPath)
        .toFormat('mp3')
        .output(tmpMp3Path)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    console.log('Converted to MP3:', tmpMp3Path);

    // Upload back to B2
    const fileBufferMp3 = await fs.readFile(tmpMp3Path);
    console.log('file ready');
    const uploadUrl = await b2.getUploadUrl({ bucketId });
    console.log('uploadUrl ready');
    await b2.uploadFile({
      uploadUrl: uploadUrl.data.uploadUrl,
      uploadAuthToken: uploadUrl.data.authorizationToken,
      fileName: `${folderName}/${mp3FileName}`,
      data: fileBufferMp3,
      mime: mime.lookup(mp3FileName) || 'audio/mpeg',
    });

    console.log('Uploaded MP3 to B2');
    
    // Optional: get fileId if you don't already have it
    console.log("Deleting ", `${folderName}/${fileName}`)
    const list = await b2.listFileNames({ bucketId, prefix: `${folderName}/${fileName}` });
    console.log('Listed files in bucket:', list.data.files.length);
    const file = list.data.files.find(f => f.fileName === `${folderName}/${fileName}`);

    if (file) {
        await b2.deleteFileVersion({
            fileName: file.fileName,
            fileId: file.fileId
        });

        console.log(`✅ Deleted original file: ${fileName}`);
    } else {
        console.log('⚠️ File not found for deletion');
    }

    // Cleanup
    await fs.unlink(tmpAmrPath);
    await fs.unlink(tmpMp3Path);

    console.log('Cleanup done.');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

// Utility to buffer a stream
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

export const updateAudioOfCourses = async () => {
  const courses = JSON.parse(fs1.readFileSync("fixed audios.json", "utf-8"));
  let myCourses = []
  for (const course of courses) {
    console.log(`Processing course: ${course.title} by ${course.ustaz}`);
    try{
      console.log("Updating course: ", `${course.title} by ${course.ustaz}`);
      const { _id, ...courseWithoutId } = course;
      await CourseModel.updateOne({ courseId: course.courseId }, { $set: courseWithoutId })
      console.log(`✅ Updated course`);
    }catch(err){
      console.error(`❌ Error updating course: ${err.message}`);
      var ucourse = course;
      myCourses.push(ucourse);
    }
  }
  const fileName = `uncheckedCourses.json`;
  fs1.writeFileSync(fileName, JSON.stringify(myCourses, null, 2));
}