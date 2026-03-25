<div align="center">
  <h1> 🎲 Simply Monopoly</h1>
</div>

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/by-Cody%20R-cyan?style=for-the-badge" alt="Cody R" />
</div>

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-0000FF?style=for-the-badge&logo=javascript&logoColor=white" alt="JavaScript" />
  <img src="https://img.shields.io/badge/React-FF0000?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/React_Router-FF00FF?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
</div>
<div align="center">
  <img src="https://img.shields.io/badge/Java-teal?style=for-the-badge" alt="Java" />
  <img src="https://img.shields.io/badge/Spring%20Boot-00FF00?style=for-the-badge&logo=spring%20boot&logoColor=333333" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Hibernate-FFA500?style=for-the-badge&logo=hibernate" alt="Hibernate" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/HTML-purple?style=for-the-badge" alt="HTML" />
  <img src="https://img.shields.io/badge/CSS-yellow?style=for-the-badge&logo=css&logoColor=333333" alt="CSS" />
  <img src="https://img.shields.io/badge/MySQL-darkblue?style=for-the-badge" alt="MySQL" />
  <img src="https://img.shields.io/badge/Maven-pink?style=for-the-badge&logo=apachemaven&logoColor=333333" alt="Maven" />
</div>

---

<div align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#tech">Tech Stack</a> •
  <a href="#visuals">Visuals</a> •
  <a href="#install">Installation</a> •
  <a href="#future">Future Features</a> •
</div>

---

<a name="about" ></a>
## About the Project

I developed a web application called Simply Monopoly, a simplified and customizable version of the classic Monopoly game designed for quick, pick-up-and-play sessions. The application supports up to four players, allowing users to move around a board, purchase properties, and collect rent through an intuitive interface.

A key focus of the project was customization and user control. Players can personalize their experience by setting names, choosing colors, and defining starting money. Additionally, the game allows users to configure the board itself, including the number of spaces and their associated values, creating a flexible and dynamic gameplay experience.

From a technical standpoint, I implemented persistent game state by integrating database functionality, enabling users to save and resume games through backend data storage. This project strengthened my ability to design interactive web applications, manage user input, and connect front-end functionality with backend systems.

<a name="features" ></a>
## Simply Monopoly – Feature Overview

### General Gameplay

- Turn-based system where players move around the board based on dice rolls
- Property system:
  - Players can purchase unowned spaces
  - Rent is automatically applied when landing on owned properties
  - Owned spaces are safe when revisited by the owner
- Economy mechanics:
  - Players receive bonus funds when passing the starting space
- Game-ending conditions:
  - Configurable turn limit
  - Player bankruptcy detection

### Customization

- Player personalization:
  - Custom names, colors, and starting balance
- Board configuration:
  - Add or remove spaces dynamically
  - Customize space names, purchase costs, and rent values
- Game rules customization:
  - Adjustable number of turns
  - Configurable number of dice
  - Custom bonus amount for passing the starting point

### Additional Features

- Persistent game state:
  - Save and reload functionality using database integration
- Multiple board variations:
  - Three distinct space group sets supporting different gameplay experiences

<a name="tech" ></a>
## Tech Stack
### Front End

| Technology | Description |
|        ---:|:---         |
| <img src="https://img.shields.io/badge/JavaScript-0000FF?style=for-the-badge&logo=javascript&logoColor=white" alt="JavaScript" /> | Core programming language used to build dynamic and interactive web applications, handling logic, data manipulation, and asynchronous operations |
| <img src="https://img.shields.io/badge/React-FF0000?style=for-the-badge&logo=react&logoColor=white" alt="React" /> | Component-based JavaScript library for building responsive user interfaces, enabling reusable code and efficient state management |
| <img src="https://img.shields.io/badge/React_Router-FF00FF?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" /> | Library for managing client-side routing in React applications, allowing seamless navigation between views without full page reloads |
| <img src="https://img.shields.io/badge/HTML-purple?style=for-the-badge" alt="HTML" /> | Markup language used to structure web content and define the layout of application interfaces |
| <img src="https://img.shields.io/badge/CSS-yellow?style=for-the-badge&logo=css&logoColor=333333" alt="CSS" /> | Styling language used to design and format web pages, including layout, colors, and responsive design |

### Back End

| Technology | Description |
|        ---:|:---         |
| <img src="https://img.shields.io/badge/Java-teal?style=for-the-badge" alt="Java" /> | Primary programming language used to build object-oriented applications with a focus on scalability, performance, and maintainability |
| <img src="https://img.shields.io/badge/Spring%20Boot-00FF00?style=for-the-badge&logo=spring%20boot&logoColor=333333" alt="Spring Boot" /> | Framework for developing production-ready Java applications, simplifying backend development through dependency injection, RESTful APIs, and rapid configuration |
| <img src="https://img.shields.io/badge/Hibernate-FFA500?style=for-the-badge&logo=hibernate" alt="Hibernate" /> | Object-Relational Mapping (ORM) framework used to manage database interactions by mapping Java objects to relational tables |
| <img src="https://img.shields.io/badge/Maven-pink?style=for-the-badge&logo=apachemaven&logoColor=333333" alt="Maven" /> | Build automation and dependency management tool used to manage project structure, libraries, and application lifecycle |
| <img src="https://img.shields.io/badge/MySQL-darkblue?style=for-the-badge" alt="MySQL" /> | Relational database management system used for storing, querying, and managing application data |

<a name="visuals" ></a>
## Game Visuals

<a name="install" ></a>
## Installation

To run this project on a local device, you will need the following tools.
- Node.js
- NPM (Node Package Manager)
- Java Development Kit v21
- MySQL Server

### Set-up Workspace
**Clone the Respository:** I use GitHub Desktop with its built in features to clone. Alternatively, use the Terminal to clone.
  ```shell
  git clone https://github.com/CodyRR/Unit-2-Simply-Monopoly.git
  ```
### Back-end Setup
1. Create a MySQL Database called `simply_monopoly_database`
   
1. Create an .env file at the project root directory (`simply-monopoly-backend`)
   The file should look like this:
   ```
   DB_HOST="localhost"
   DB_PORT="3306"
   DB_NAME="simply_monopoly_database"
   DB_USER="root" # or your username
   DB_PASS=[your password]
   ```

1. Run the Java/Spring Boot Application. This uses an IDE, IntelliJ was used for mine. If you do not have it loaded in an IDE, use the Terminal. Navigate to the root directy and run this command:
   ```shell
    mvn spring-boot:run
    ```

### Front-end Setup
1. In your terminal, navigate to the front-end directory (`simplified-monopoly-frontend`)
   ```shell
   cd ../simplified-monopoly-frontend
   ```

1. Install npm and run React/Vite
   ```shell
   npm install
   npm run dev
   ```

1. Open your browser to `http://localhost:5173`

<a name="future" ></a>
## Future Features

1. **Adding confirmation/warning windows**
    - Implemented confirmation and warning dialogs to prevent unintended data modifications or deletions
    - Added user prompts for critical actions, improving overall usability and reducing the risk of errors
    - Enhanced user experience by providing clear feedback before irreversible changes are applied

1. **Adding data hanlding and error tests**
    - Added error handling mechanisms to manage invalid inputs and prevent application crashes
    - Developed testing strategies to identify edge cases
    - Improved overall reliability by anticipating and handling potential runtime issues

1. **Visual improvement**
    - Fix up the CSS so that the application looks cleaner
    - Possible remaking a color theme
