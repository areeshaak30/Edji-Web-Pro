import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import rightImage from "../../assets/images/right-image.png";
import logo from "../../assets/images/EdjiLogo.png";
import humanWelcome from "../../assets/images/mdi_human-welcome.png";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import Flag from "react-world-flags";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const languages = [
    { value: "en", label: "English", code: "GB" },
    { value: "fr", label: "French", code: "FR" },
    { value: "ru", label: "Russian", code: "RU" },
    { value: "ar", label: "Arabic", code: "AE" },
    { value: "he", label: "Hebrew", code: "IL" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  useEffect(() => {
    const currentLanguage = i18n.language || "en";
    const defaultLang =
      languages.find((lang) => lang.value === currentLanguage) || languages[0];
    setSelectedLanguage(defaultLang);
    i18n.changeLanguage(defaultLang.value);
  }, []);

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    i18n.changeLanguage(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(t("Please enter your email"));
      return;
    } else if (/\s/.test(email)) {
      setError(t("Email should not contain spaces!"));
      return;
    } else if (!/^[^@]+@[^\s]+$/.test(email)) {
      setError(t("Please enter a valid email address!"));
      return;
    }

    try {
      const res = await fetch("https://dev.edji.co/v1/auth/token", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          grantType: "password",
          userName: email,
        }),
      });
      const data = await res.json();
      console.log("First API response:", data);
      if (data.error === "mfa_required") {
        setMfaToken(data.mfaToken);
        // 2nd API CALL
        const authenticatorsRes = await fetch(
          "https://dev.edji.co/v1/mfa/authenticators",
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/JSON",
              Authorization: `Bearer ${data.mfaToken}`,
            },
          }
        );
        const authenticatorsData = await authenticatorsRes.json();
        console.log("Authenticators fetch response:", authenticatorsData);
        if (authenticatorsRes.ok) {
          if (authenticatorsData && authenticatorsData.length > 0) {
            setAuthenticators(authenticatorsData);
            const defaultAuthenticator = authenticatorsData.find(
              (auth) => auth.active
            );
            if (defaultAuthenticator) {
              // 3rd API Call
              await postMfaChallenge(defaultAuthenticator.id, data.mfaToken);
            } else {
              setError("No active authenticators found.");
            }
          } else {
            setError("No authenticators available.");
          }
        } else {
          setError("Failed to fetch Authenticators!");
        }
        // Handle MFA as in your original code
      } else {
        setError(t("Unexpected error during login."));
      }
    } catch (error) {
      console.error("Error during the API call:", error);
      setError(t("Network error or server error. Please try again."));
    }
  };

  // 3rd API def
  const postMfaChallenge = async (authenticatorId, mfaToken) => {
    try {
      const res = await fetch("https://dev.edji.co/v1/mfa/challenge?lang=heb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mfaToken}`,
        },
        body: JSON.stringify({
          challengeType: "oob",
          authenticatorId,
          mfaToken,
        }),
      });
      const data = await res.json();
      console.log("MFA Challenge Response:", data);
      const authcode = data.oobCode;
      console.log(authcode, "authcode now");
      console.log(authenticatorId);

      // Replace AsyncStorage with localStorage
      localStorage.setItem("mfaToken", mfaToken);
      localStorage.setItem("oobCode", authcode);

      if (res.ok) {
        navigate("/emailverification"); // Navigate to email verification page
      } else {
        const errorData = await res.json();
        setError("Failed to post MFA challenge.");
        console.log("Error posting MFA challenge:", errorData);
      }
    } catch (error) {
      setError("Error in MFA Challenge.");
      console.error("Error in MFA Challenge:", error);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "4px 8px",
      width: "40%",
      backgroundColor: "#D6EBF2",
      boxShadow: "none",
      margin: "0 auto",
      "&:hover": {
        borderColor: "#888",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      backgroundColor: state.isFocused ? "#e9ecef" : "#fff",
      color: "#333",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      color: "#495057",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#3B9EBE",
      "&:hover": {
        color: "#3B9EBE",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/2 bg-gray-50 flex flex-col items-center mt-9">
        <img src={logo} alt="Logo" className="mb-6 w-39" />

        {/* Welcome Text with Human Welcome Image (on the right) */}
        <div className="flex items-center justify-center">
          <div
            style={{
              fontFamily: "Lato",
              fontWeight: "700",
              fontSize: "32px",
              lineHeight: "38.4px",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            {t("Welcome to Edji")}
          </div>
          <img
            src={humanWelcome}
            alt="Human Welcome"
            style={{
              width: "30px",
              height: "30px",
              marginLeft: "8px", // Moves the image to the right of the text
            }}
          />
        </div>

        {/* "We are happy to see you here!" Text */}
        <div
          style={{
            fontFamily: "Lato",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "21.6px",
            color: "rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          {t("We are happy to see you here!")}
        </div>

        <div className="mt-4 w-full max-w-md">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-2 text-center"
          >
            {t("Select Language")}
          </label>
          <Select
            id="language"
            options={languages.map((lang) => ({
              value: lang.value,
              label: (
                <div className="flex items-center">
                  <Flag
                    code={lang.code}
                    style={{ width: "20px", marginRight: "8px" }}
                  />
                  {lang.label}
                </div>
              ),
            }))}
            value={{
              value: selectedLanguage.value,
              label: (
                <div className="flex items-center">
                  <Flag
                    code={selectedLanguage.code}
                    style={{ width: "20px", marginRight: "8px" }}
                  />
                  {selectedLanguage.label}
                </div>
              ),
            }}
            onChange={handleLanguageChange}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
          />
        </div>

        <form className="w-full max-w-md mt-6" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="flex justify-center text-sm font-medium text-gray-700 my-6"
          >
            {t("Please enter your email to proceed")}
          </label>
          <div className="relative mb-4">
            <span>{t("Email")}</span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Zakholiver@gmail.com"
              value={email}
              onChange={handleInputChange}
              className={`w-full px-10 py-3 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                error ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            <span className="absolute left-3 top-2/3 transform -translate-y-1/2 text-gray-400">
              📧
            </span>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg"
          >
            {t("Continue")}
          </button>
        </form>
      </div>

      <div className="w-1/2 m-3">
        <img
          src={rightImage}
          alt="Decorative"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
