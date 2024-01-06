# Bit Blogger

Bit Blogger is a blogging website created by Shubham Agarwal, specifically designed for the students of Birla Institue of Technology, Mesra. This platform provides an avenue for students to share their thoughts, experiences, and insights with the BIT Mesra community. The project is hosted on [bit-blogger.netlify.app](https://bit-blogger.netlify.app/).

## Features

- **User-friendly Interface**: The website offers an intuitive and easy-to-navigate user interface, ensuring a seamless blogging experience.

- **Student-Centric Platform**: Tailored to meet the needs and preferences of BIT Mesra students, Bit Blogger aims to foster a sense of community through shared experiences and knowledge.

- **Responsive Design**: The website is designed to be responsive across various devices, ensuring an optimal viewing experience for users on desktops, tablets, and smartphones.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/ag-shubham/Project_02.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Project_02
    ```

3. Navigate to both the frontend and backend directories and install the necessary node modules separately:

    ```bash
    # Inside the frontend directory
    cd frontend
    npm install

    # Inside the backend directory
    cd ../backend
    npm install
    ```

4. Create a `.env` file in the `backend` directory and connect to your own MongoDB database, and make up your own JWT_SECRET. 

5. Run the project:

    - **Backend:**
      - Use `nodemon` for automatic server restarts during development:
      
        ```bash
        cd backend
        nodemon index.js
        ```
      - Alternatively, without `nodemon`:

        ```bash
        cd backend
        node index.js
        ```

    - **Frontend:**
      ```bash
      cd frontend
      npm start
      ```

## Contributing

If you'd like to contribute to Bit Blogger, please follow these guidelines:

1. Fork the repository.

2. Create a new branch:

    ```bash
    git checkout -b feature/new-feature
    ```

3. Make your changes and commit them:

    ```bash
    git commit -m "Add new feature"
    ```

4. Push to the branch:

    ```bash
    git push origin feature/new-feature
    ```

5. Create a pull request.


## Issues

If you encounter any issues or have suggestions for improvement, please feel free to open an issue on the [GitHub Issues](https://github.com/ag-shubham/Project_02/issues) page.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to Render and Netlify for being useful in the deployment of Bit Blogger.

---

Happy Blogging! 🚀
