import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// export type ConvertRtspToHlsProcess = Promise<void>;

export function convertRtspToHls(rtspUrl: string, outputPath: string) {
  fs.mkdirSync(outputPath, { recursive: true });

  const m3u8 = path.join(outputPath, 'index.m3u8');

  const args = [
    '-rtsp_transport',
    'tcp',
    '-i',
    rtspUrl,
    '-c:v',
    'copy',
    '-c:a',
    'copy',
    '-hls_time',
    '5',
    '-hls_list_size',
    '3',
    '-hls_flags',
    'delete_segments',
    '-start_number',
    '0',
    m3u8,
  ];

  const ffmpeg = spawn('ffmpeg', args);

  ffmpeg.on('close', (code) => {
    console.error('Close ffmpeg width code:', code);
  });

  return ffmpeg;

  // return new Promise<void>((resolver, reject) => {
  // ffmpeg(rtspUrl)
  //   .addInputOption('-rtsp_transport', 'tcp') // RTSP over TCP
  //   .addInputOption('-c:v', 'copy') // 비디오 코덱 복사 (재인코딩 X, 저사양 서버에 유리)
  //   .addInputOption('-c:a', 'copy') // 오디오 코덱 복사
  //   .addInputOption('-hls_time', '5') // 세그먼트 길이 (초)
  //   .addInputOption('-hls_list_size', '3') // 플레이리스트에 포함될 세그먼트 개수
  //   .addInputOption('-hls_flags', 'delete_segments') // 세그먼트 자동 삭제
  //   .addInputOption('-start_number', '0')
  //   .output(m3u8)
  //   .on('end', () => {
  //     resolver();
  //   })
  //   .on('error', (err) => {
  //     reject(err);
  //   })
  //   .run();
  // });
}

export default {
  convertRtspToHls,
};
