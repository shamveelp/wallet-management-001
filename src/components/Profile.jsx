"use client"

import { useState, useEffect } from "react"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import axios from "axios"
import ImageCropper from "./ImageCropper"

function Profile({ address }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    imageUrl: "",
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [showCropper, setShowCropper] = useState(false)
  const [originalImage, setOriginalImage] = useState("")

  useEffect(() => {
    loadProfile()
  }, [address])

  const loadProfile = async () => {
    setIsLoading(true)
    try {
      const docRef = doc(db, "users", address)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        setProfileData(data)
        setImagePreview(data.imageUrl || "")
      } else {
        // New user, enable editing mode
        setIsEditing(true)
      }
    } catch (error) {
      console.error("Error loading profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setOriginalImage(reader.result)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedBlob) => {
    setImage(croppedBlob)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(croppedBlob)
    setShowCropper(false)
  }

  const handleCropCancel = () => {
    setShowCropper(false)
    setOriginalImage("")
  }

  const handleImageUpload = async () => {
    if (!image) return profileData.imageUrl

    try {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const res = await axios.post(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, formData);
  return res.data.secure_url;
} catch (error) {
  console.error("Image upload failed:", error);
  return profileData.imageUrl;
}
return profileData.imageUrl
    
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      let finalImageUrl = profileData.imageUrl

      if (image) {
        finalImageUrl = await handleImageUpload()
      }

      const updatedProfile = {
        ...profileData,
        imageUrl: finalImageUrl,
      }

      await setDoc(doc(db, "users", address), updatedProfile)
      setProfileData(updatedProfile)
      setIsEditing(false)
      setImage(null)

      // Success feedback
      alert("✅ Profile saved successfully!")
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("❌ Failed to save profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setImage(null)
    setImagePreview(profileData.imageUrl || "")
    // Reset form data
    loadProfile()
  }

  if (isLoading) {
    return (
      <div className="profile-card">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (showCropper) {
    return (
      <div className="profile-card">
        <ImageCropper imageSrc={originalImage} onCropComplete={handleCropComplete} onCancel={handleCropCancel} />
      </div>
    )
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h3>👤 Profile</h3>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            ✏️ Edit
          </button>
        )}
      </div>

      <div className="profile-content">
        {isEditing ? (
          <div className="profile-form">
            <div className="form-group">
              <label>Profile Picture</label>
              <div className="image-upload">
                <input type="file" accept="image/*" onChange={handleImageChange} id="image-upload" />
                <label htmlFor="image-upload" className="upload-label">
                  {imagePreview ? (
                    <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">📷 Choose Image</div>
                  )}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                placeholder="Tell us about yourself..."
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button className="save-btn" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "💾 Saving..." : "💾 Save Profile"}
              </button>
              <button className="cancel-btn" onClick={handleCancel} disabled={isSaving}>
                ❌ Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-view">
            {profileData.imageUrl && (
              <div className="profile-image">
                <img src={profileData.imageUrl || "/placeholder.svg"} alt="Profile" />
              </div>
            )}

            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{profileData.name || "Not set"}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{profileData.email || "Not set"}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Bio:</span>
                <span className="info-value bio">{profileData.bio || "No bio available"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
