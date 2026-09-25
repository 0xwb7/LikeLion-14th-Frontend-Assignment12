import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exchangeToken, fetchProfile } from "../lib/kakao";
import {saveSession } from "../lib/auth";
  
function CallbackPage() {
    const [searchParams] =
      useSearchParams();
  
    const navigate =
      useNavigate();
  
    const [
      errorMessage,
      setErrorMessage,
    ] = useState("");
  
    useEffect(() => {
      const code =
        searchParams.get("code");
  
      const error =
        searchParams.get("error");
  
      if (error || !code) {
  
        navigate(
          "/login",
          { replace: true }
        );
  
        return;
      }

      const login = async () => {
  
        try {
          const accessToken =
            await exchangeToken(code);

          const profile =
            await fetchProfile(
              accessToken
            );
  
          saveSession(
            accessToken,
            profile
          );
  
          navigate(
            "/home",
            { replace: true }
          );
  
        } catch (error) {
  
          console.error(error);
  
          setErrorMessage(
            "로그인 처리 중 문제가 발생했습니다."
          );
        }
      };
  
      login();
    }, []);
  
  
    return (
      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-white
          px-5
        "
      >
  
        <section
          className="
            w-full
            max-w-sm
            rounded-3xl
            border
            border-neutral-200
            bg-neutral-100
            px-8
            py-12
            text-center
            shadow-sm
          "
        >
  
          {errorMessage ? (
  
            <>
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                  text-2xl
                  font-black
                  text-red-500
                "
              >
                !
              </div>
  
  
              <h2
                className="
                  mt-5
                  text-xl
                  font-bold
                  text-neutral-900
                "
              >
                로그인에 실패했습니다
              </h2>
  
  
              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-neutral-500
                "
              >
                {errorMessage}
              </p>
  
  
              <button
                onClick={() =>
                  navigate("/login")
                }
                className="
                  mt-7
                  w-full
                  rounded-2xl
                  bg-[#FEE500]
                  py-4
                  font-bold
                  text-neutral-900
                  cursor-pointer
                "
              >
                다시 로그인하기
              </button>
            </>
  
          ) : (
  
            <>
  
  
              {/* 로딩 */ }
              <div
                className="
                  mx-auto
                  mt-6
                  h-9
                  w-9
                  animate-spin
                  rounded-full
                  border-4
                  border-neutral-200
                  border-t-[#FEE500]
                "
              />
  
  
              <h2
                className="
                  mt-6
                  text-xl
                  font-bold
                  text-neutral-900
                "
              >
                로그인 중입니다
              </h2>
  
  
              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-neutral-500
                "
              >
                카카오 계정 정보를
                확인하고 있어요.
                <br />
  
                잠시만 기다려주세요.
              </p>
            </>
  
          )}
  
        </section>
  
      </main>
    );
  }
  
  
  export default CallbackPage;
