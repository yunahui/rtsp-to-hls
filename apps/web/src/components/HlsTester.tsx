// ==================================================
// HlsPlayer.tsx
// - hls.js를 사용하여 HLS 스트림을 재생하는 React 컴포넌트
// ==================================================

import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Hls from 'hls.js';

const HlsTester = () => {
  const [id, setId] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  async function postStream() {
    const res = await axios.post<{ id: string; url: string }>('/api/streams', { url });

    const { id } = res.data;

    setId(id);
  }

  useEffect(() => {
    if (!id) return;
    if (!Hls.isSupported() || !videoRef.current) return;

    const hls = new Hls();
    hls.loadSource('/stream/' + id + '/index.m3u8');
    hls.attachMedia(videoRef.current);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      videoRef.current?.play();
    });

    return () => {
      hls.destroy();
    };
  }, [id]);

  return (
    <Container>
      <InfoContainer>
        <h2>HLS Stream Tester</h2>
        <input
          type="text"
          placeholder="Enter HLS URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button onClick={postStream} style={{ padding: '10px 20px' }}>
          Test Stream
        </button>
      </InfoContainer>
      <VideoContainer>
        <video id="video" ref={videoRef} autoPlay muted style={{ width: '100%', height: '100%' }}></video>
      </VideoContainer>
    </Container>
  );
};

export default HlsTester;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #1f1f1f;
`;
