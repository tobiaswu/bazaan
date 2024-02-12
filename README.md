# **Bazaan**

## **Project Overview**

Bazaan is a decentralized social shopping network that empowers users to create and manage their own online shops. Leveraging the Internet Computer Protocol (ICP) blockchain, Bazaan emphasizes privacy, autonomy, and local commerce. Users can tailor their shops and channels to their country, fostering local business connections and community support.

**Demo:** [Try out Bazaan](https://zqaj2-eqaaa-aaaal-adpdq-cai.icp0.io/)

### **Challenges Addressed**

The global crisis has highlighted vulnerabilities in the supply chain, particularly within the essential goods sector. Dominated by a few large corporations, small local farmers and businesses often struggle to compete. The technical and logistical barriers to establishing an online presence compound these challenges, limiting their market reach and growth potential.

### **Our Solution**

Bazaan bridges this gap by offering a straightforward platform for local businesses to create online shops, lend equipment, and offer services. This initiative not only provides an additional revenue stream but also enhances food sovereignty and community resilience through decentralized trade and communication.

## **Technical Overview**

Deployed on the Internet Computer Blockchain, Bazaan utilizes cutting-edge technologies to ensure a seamless and secure user experience.

### **Frontend**

- **Framework:** Next.js with TypeScript for robust web application development.
- **APIs:** Juno APIs for secure data, file storage, and user authentication via Internet Identity.
- **UI Design:** TailwindCSS for styling, Shadcn UI, and Lucide React icons for intuitive user interface design.
- **Forms:** React Hook Form with Zod for efficient and reliable form validation.

### **Backend**

- **Future Development:** Plans to extend app functionalities using Rust canisters.

## **How to Use Bazaan?**

1. **Sign-Up:** Register using Internet Identity.
2. **Onboarding:** Complete your profile on the onboarding page.
3. **Discovery:**
    - Access channels and shops in your country.
    - Use the button next to the search bar to start creating your shop.
    - After shop creation, add products to it.
    - Navigate back to discovery to create a channel.
4. **Management:** Use the 3 vertical dots for options to delete products, shops, or channels.
5. **Settings:** Click the settings icon in the sidebar for options like log out or to view your balance.

### **Limitations**

- Users are currently restricted to creating one shop with up to five products and one channel.

## **Roadmap**

- Enhanced search functionality for channels and shops.
- Channel improvements: group and private chats, real-time data, public channel joining.
- Editing capabilities for channels, shops, and products.
- Wallet features: Deposit and withdraw ICP, ckBTC, ckETH.
- Secure transactions: Introduction of an escrow wallet canister for safe payments.
- Financial stability: Adoption of a stable coin or dynamic pricing to mitigate price volatility.
- Https outcalls to fetch cities.

## **Getting Started**

### **Running the App Locally**

1. Clone the repository.
2. Install dependencies with **`npm install`**.
3. Set up a satellite in Juno’s console.
4. Install Juno CLI and log in.
5. Launch the development server with **`npm run dev`**.

### **Deployment**

1. Build the application with **`npm run build`**.
2. Deploy using **`juno deploy`** from the project root. If prompted, specify **`out`** as the folder containing your built app files.
3. Access your deployed application by running **`juno open`**.
