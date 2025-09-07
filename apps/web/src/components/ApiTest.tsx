import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export interface ApiTesterProps {
  name: string;
  url: string;
}

export default function ({ name, url }: ApiTesterProps) {
  const [response, setResponse] = useState<string>('Not fetched');
  const [loading, setLoading] = useState(false);

  async function fetchApi() {
    setLoading(true);
    const res = await fetch(url);
    try {
      const data = await res.text();
      setResponse(data);
    } catch (e) {
      try {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } catch (e) {
        setResponse('Error parsing response');
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Card>
      <Header>
        <NameBox>{name}</NameBox>
        <FetchButton onClick={fetchApi} disabled={loading}>
          {loading ? '불러오는 중...' : '다시 불러오기'}
        </FetchButton>
      </Header>
      <ResponseBox>{response}</ResponseBox>
    </Card>
  );
}

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 24px 28px 20px 28px;
  max-width: 700px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NameBox = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  letter-spacing: 0.02em;
`;

const ResponseBox = styled.pre`
  background: #f8fafc;
  padding: 18px 14px;
  border-radius: 8px;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 1rem;
  color: #222;
  min-height: 80px;
  margin: 0;
  border: 1px solid #e2e8f0;
`;

const FetchButton = styled.button`
  background: linear-gradient(90deg, #4f8cff 0%, #2355e6 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  &:hover:enabled {
    background: linear-gradient(90deg, #2355e6 0%, #4f8cff 100%);
  }
`;
