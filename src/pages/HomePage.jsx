import { useNavigate } from "react-router-dom";
import { clearSession, getProfile } from "../lib/auth";

function HomePage() {
  const navigate = useNavigate();
  const profile = getProfile();
  const kakaoProfile = profile?.kakao_account?.profile;
  const nickname =
    kakaoProfile?.nickname ||
    profile?.properties?.nickname ||
    "카카오 사용자";
  const profileImage =
    kakaoProfile?.profile_image_url || profile?.properties?.profile_image;

  const handleLogout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5">
      <section className="w-full max-w-md rounded-3xl border border-neutral-200 bg-neutral-100 px-8 py-11 text-center shadow-sm">
        <div className="mx-auto h-28 w-28">
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${nickname} 프로필`}
              className="h-full w-full rounded-full border-4 border-white object-cover shadow-xl"
            />
          ) : (
            <div
              role="img"
              aria-label="기본 프로필 이미지"
              className="flex h-full w-full items-center justify-center rounded-full border-4 border-white bg-neutral-100 text-5xl shadow-xl"
            >
              👤
            </div>
          )}
        </div>

        <h1 className="mt-6 text-3xl font-bold text-neutral-900">
          {nickname}
        </h1>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 w-full cursor-pointer rounded-2xl border border-neutral-200 bg-white py-4 font-semibold text-neutral-600 transition duration-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
        >
          로그아웃
        </button>
      </section>
    </main>
  );
}

export default HomePage;
