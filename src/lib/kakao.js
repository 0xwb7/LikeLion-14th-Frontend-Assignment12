const REST_API_KEY =
  import.meta.env.VITE_KAKAO_REST_API_KEY;

const REDIRECT_URI =
  import.meta.env.VITE_KAKAO_REDIRECT_URI;

export function getKakaoAuthorizeUrl() {
  const params = new URLSearchParams({
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
  });

  return (
    "https://kauth.kakao.com/oauth/authorize?" +
    params.toString()
  );
}

export async function exchangeToken(code) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code,
  });

  const response = await fetch(
    "https://kauth.kakao.com/oauth/token",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded;charset=utf-8",
      },

      body: params,
    }
  );

  if (!response.ok) {
    throw new Error(
      "카카오 액세스 토큰 발급에 실패했습니다."
    );
  }

  const data = await response.json();

  return data.access_token;
}


export async function fetchProfile(accessToken) {
  const response = await fetch(
    "https://kapi.kakao.com/v2/user/me",
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "카카오 사용자 정보를 불러오지 못했습니다."
    );
  }

  return response.json();
}
