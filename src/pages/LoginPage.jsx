import { getKakaoAuthorizeUrl } from "../lib/kakao";

function LoginPage() {
  const handleKakaoLogin = () => {
    window.location.href = getKakaoAuthorizeUrl();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5">
      <section className="w-full max-w-md rounded-3xl border border-neutral-200 bg-neutral-100 px-8 py-12 text-center shadow-sm">
        <h1 className="text-3xl font-extrabold text-neutral-900">
          카카오 로그인
        </h1>

        <button
          type="button"
          onClick={handleKakaoLogin}
          className="mt-9 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#FEE500] px-4 text-base font-medium text-black/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 fill-black"
          >
            <path d="M12 3C6.477 3 2 6.477 2 10.765c0 2.665 1.735 5.014 4.377 6.412l-1.112 4.079a.375.375 0 0 0 .574.405l4.871-3.218c.423.045.853.068 1.29.068 5.523 0 10-3.477 10-7.766C22 6.477 17.523 3 12 3Z" />
          </svg>
          카카오로 로그인하기
        </button>
      </section>
    </main>
  );
}

export default LoginPage;
