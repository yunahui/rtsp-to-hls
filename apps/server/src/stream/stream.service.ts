import { BadRequestException, Injectable } from '@nestjs/common';
import ffmpeg from '@/libs/ffmpeg';

@Injectable()
export class StreamService {
  //  TODO: 데이터베이스 연동
  private readonly processes: Map<string, any> = new Map();

  healthCheck(id: string) {
    return this.processes.has(id);
  }

  create(url: string) {
    if (!this.validateRtspUrl(url)) throw new BadRequestException('Invalid RTSP URL');

    const id = this.generateId();

    const outputPath = `${process.cwd()}/hls/${id}`;

    const child = ffmpeg.convertRtspToHls(url, outputPath);

    this.setProcess(id, child);

    return {
      id,
      url,
    };
  }

  // TODO: utils로 분리
  private validateRtspUrl(url: string) {
    return true;
  }

  // TODO: uuid는 데이터베이스에서 관리
  private generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private setProcess(id: string, child: any) {
    this.processes.set(id, child);

    child.on('exit', () => {
      this.processes.delete(id);
    });
  }
}
