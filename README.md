# 🚀 Web3 Profile Manager

A modern, decentralized profile management application that allows users to connect their Web3 wallets and manage their profiles across multiple blockchain networks.

**Made by Coding Aashan** 👨‍💻

## ✨ Features

### 🔗 Wallet Integration
- **MetaMask Connection**: Seamless wallet connection with MetaMask
- **Multi-Network Support**: Ethereum, BSC (Binance Smart Chain), and Polygon
- **Real-time Balance**: Display wallet balance for the current network
- **Network Switching**: Easy switching between supported networks
- **Disconnect Option**: Clean wallet disconnection functionality

### 👤 Profile Management
- **View/Edit Modes**: Toggle between viewing and editing profile information
- **Image Upload**: Profile picture upload with Cloudinary integration
- **Image Cropping**: Built-in circular image cropper for perfect profile pictures
- **Data Persistence**: Profile data stored in Firebase Firestore
- **Real-time Updates**: Instant profile updates and synchronization

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Gradient Backgrounds**: Beautiful gradient designs and animations
- **Card-based Layout**: Clean, modern card-based interface
- **Smooth Animations**: Hover effects and smooth transitions
- **Loading States**: Professional loading indicators and feedback

### 🔒 Security & Performance
- **Environment Variables**: Secure configuration management
- **Error Handling**: Comprehensive error handling and user feedback
- **Input Validation**: Form validation and data sanitization
- **Optimized Performance**: Efficient state management and rendering

## 🛠️ Tech Stack

- **Frontend**: React.js (JavaScript)
- **Styling**: CSS3 with modern features
- **Blockchain**: Ethers.js for Web3 integration
- **Database**: Firebase Firestore
- **Image Storage**: Cloudinary
- **Wallet**: MetaMask integration

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/wallet-management-001.git
   cd wallet-management-001
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   \`\`\`

4. **Set up Cloudinary**
   - Create a Cloudinary account
   - Set up an upload preset named `your_preset_name`
   - Update the Cloudinary URL in the Profile component

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🚀 Usage

### Getting Started
1. **Install MetaMask**: Make sure you have MetaMask installed in your browser
2. **Connect Wallet**: Click the "Connect MetaMask" button
3. **Switch Networks**: Use the network switcher to change between Ethereum, BSC, and Polygon
4. **Create Profile**: Fill in your profile information and upload a profile picture
5. **Save & Edit**: Save your profile and edit it anytime by clicking the edit button

### Supported Networks
- **Ethereum Mainnet** ⟠
  - Chain ID: 1 (0x1)
  - Symbol: ETH
- **BSC (Binance Smart Chain)** 🟡
  - Chain ID: 56 (0x38)
  - Symbol: BNB
- **Polygon** 🟣
  - Chain ID: 137 (0x89)
  - Symbol: MATIC

## 📁 Project Structure

\`\`\`
web3-profile-manager/
├── app.jsx                 # Main application component
├── components/
│   ├── Profile.jsx         # Profile management component
│   ├── WalletCard.jsx      # Wallet information display
│   ├── NetworkSwitcher.jsx # Network switching component
│   └── ImageCropper.jsx    # Image cropping functionality
├── firebase.js             # Firebase configuration
├── App.css                 # Main stylesheet
└── README.md              # This file
\`\`\`

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Set up authentication (optional)
4. Copy your config keys to the environment variables

### Cloudinary Setup
1. Create an account at [Cloudinary](https://cloudinary.com/)
2. Go to Settings > Upload
3. Create an upload preset named `wallet-001`
4. Set it to "Unsigned" for easier integration

### MetaMask Networks
The app automatically handles network addition to MetaMask if the network isn't already added.

## 🎯 Features in Detail

### Wallet Connection
- Detects MetaMask installation
- Handles connection errors gracefully
- Shows wallet address, network, and balance
- Copy address to clipboard functionality

### Profile Management
- **Name**: User's display name
- **Email**: Contact email address
- **Bio**: Personal description
- **Profile Picture**: Uploaded and cropped image

### Image Cropping
- Drag-to-position cropping interface
- Circular crop preview
- Automatic image optimization
- Support for various image formats

### Network Switching
- Visual network indicators
- Automatic balance updates
- Network addition for MetaMask
- Error handling for network operations

## 🐛 Troubleshooting

### Common Issues

**MetaMask not detected**
- Ensure MetaMask is installed and enabled
- Refresh the page and try again

**Network switching fails**
- Check if the network is supported
- Try adding the network manually to MetaMask

**Profile not saving**
- Check Firebase configuration
- Verify Cloudinary upload preset
- Check browser console for errors

**Image upload fails**
- Ensure image is under 10MB
- Check Cloudinary configuration
- Verify upload preset is set to "Unsigned"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Coding Aashan**
- GitHub: [@codingaashan](https://github.com/shamveelp)
- Twitter: [@codingaashan](https://twitter.com/shamveel_p)
- LinkedIn: [Coding Aashan](https://linkedin.com/in/shamveel-p)

## 🙏 Acknowledgments

- [MetaMask](https://metamask.io/) for Web3 wallet integration
- [Firebase](https://firebase.google.com/) for database services
- [Cloudinary](https://cloudinary.com/) for image storage
- [Ethers.js](https://ethers.org/) for blockchain interaction

## 📈 Future Enhancements

- [ ] ENS (Ethereum Name Service) integration
- [ ] NFT gallery display
- [ ] Transaction history
- [ ] Profile sharing functionality
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] IPFS integration for decentralized storage
- [ ] Social media links
- [ ] Profile verification system
- [ ] Export profile data

---

**Made with ❤️ by Coding Aashan**

*Building the future of decentralized identity, one profile at a time.*
\`\`\`

This README file provides comprehensive documentation for your Web3 Profile Manager application, including installation instructions, usage guidelines, troubleshooting tips, and proper attribution to "Coding Aashan" as requested!