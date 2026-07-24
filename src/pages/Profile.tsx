import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { Camera, Lock, User } from "lucide-react";

import PageLayout from "@/components/layout/PageLayout/PageLayout";
import ContentPanel from "@/components/shared/ContentPanel/ContentPanel";
import FadeAlert from "@/components/shared/FadeAlert/FadeAlert";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { syncAuthUsername } from "@/features/auth/authSlice";
import { loadProfile } from "@/features/profile/profileStorage";
import { updateProfile } from "@/features/profile/profileSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

const MAX_AVATAR_SIZE_BYTES = 1024 * 1024;

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { username: profileUsername, avatar } = useAppSelector((state) => state.profile);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState(profileUsername);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatar);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((previous) => ({
        ...previous,
        avatar: "Please upload a valid image file.",
      }));
      return;
    }

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      setErrors((previous) => ({
        ...previous,
        avatar: "Image must be smaller than 1 MB.",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(typeof reader.result === "string" ? reader.result : null);
      setErrors((previous) => ({ ...previous, avatar: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (!username.trim()) {
      nextErrors.username = "Username is required.";
    }

    const currentProfile = loadProfile();

    if (isUpdatingPassword) {
      if (!currentPassword) {
        nextErrors.currentPassword = "Current password is required.";
      } else if (currentPassword !== currentProfile.password) {
        nextErrors.currentPassword = "Current password is incorrect.";
      }

      if (!password) {
        nextErrors.password = "New password is required.";
      } else if (password.length < 4) {
        nextErrors.password = "Password must be at least 4 characters.";
      }

      if (!confirmPassword) {
        nextErrors.confirmPassword = "Please confirm your new password.";
      } else if (password !== confirmPassword) {
        nextErrors.confirmPassword = "Passwords do not match.";
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSaving(true);

    const updatedProfile = {
      username: username.trim(),
      password: isUpdatingPassword ? password : currentProfile.password,
      avatar: avatarPreview,
    };

    dispatch(updateProfile(updatedProfile));

    if (isAuthenticated) {
      dispatch(syncAuthUsername(updatedProfile.username));
    }

    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
    setIsUpdatingPassword(false);
    setErrors({});
    setSuccessMessage("Profile updated successfully.");
    setShowSuccess(true);
    setSaving(false);
  };

  return (
    <PageLayout>
      <ContentPanel
        title="Profile Settings"
        subtitle="Update your account details and profile picture"
        icon={<User size={20} />}
      >
        <form className="mx-auto max-w-xl space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex h-28 w-28 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-100 transition hover:border-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-indigo-500"
              aria-label="Upload profile image"
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={40} className="text-slate-400 dark:text-slate-500" />
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                <Camera size={22} className="text-white" />
              </span>
            </button>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Profile photo</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Upload a JPG or PNG image up to 1 MB.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose image
                </Button>
                {avatarPreview ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setAvatarPreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
              {errors.avatar ? (
                <p className="mt-2 text-xs text-red-500">{errors.avatar}</p>
              ) : null}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <Input
            label="Username"
            placeholder="Enter your username"
            value={username}
            error={errors.username}
            leftIcon={<User size={18} />}
            onChange={(event) => {
              setUsername(event.target.value);
              setErrors((previous) => ({ ...previous, username: "" }));
            }}
          />

          <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Password
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Your password remains unchanged unless you update it here.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsUpdatingPassword((current) => !current);
                  setCurrentPassword("");
                  setPassword("");
                  setConfirmPassword("");
                  setErrors((previous) => ({
                    ...previous,
                    currentPassword: "",
                    password: "",
                    confirmPassword: "",
                  }));
                }}
              >
                <Lock size={16} />
                {isUpdatingPassword ? "Cancel" : "Reset"}
              </Button>
            </div>

            {isUpdatingPassword ? (
              <div className="mt-5 space-y-5">
                <Input
                  type="password"
                  label="Current password"
                  placeholder="Enter your current password"
                  value={currentPassword}
                  error={errors.currentPassword}
                  leftIcon={<Lock size={18} />}
                  onChange={(event) => {
                    setCurrentPassword(event.target.value);
                    setErrors((previous) => ({ ...previous, currentPassword: "" }));
                  }}
                />

                <Input
                  type="password"
                  label="New password"
                  placeholder="Enter your new password"
                  value={password}
                  error={errors.password}
                  leftIcon={<Lock size={18} />}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors((previous) => ({ ...previous, password: "" }));
                  }}
                />

                <Input
                  type="password"
                  label="Confirm new password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  error={errors.confirmPassword}
                  leftIcon={<Lock size={18} />}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setErrors((previous) => ({ ...previous, confirmPassword: "" }));
                  }}
                />
              </div>
            ) : null}
          </div>

          <FadeAlert
            message={successMessage}
            visible={showSuccess}
            variant="success"
            onHidden={() => setShowSuccess(false)}
          />

          <Button type="submit" fullWidth loading={saving}>
            Save changes
          </Button>
        </form>
      </ContentPanel>
    </PageLayout>
  );
};

export default ProfilePage;
