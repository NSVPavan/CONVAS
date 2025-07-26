<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">CONVAS Web Application</h3>

  <p align="center">
        An Real Time browser collaborative whiteboard application.
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technolgy-used">Technologies</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#database-design">Database Design</a></li>
    <li><a href="#application-screenshots">Application Screenshots</a></li>
    <li><a href="#future-enhancements">Future Enhancements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
 Developed a collaborative web application utilizing the MERN stack (MongoDB, Express.js, React, and Node.js). The
 platform allows multiple users to sketch various objects on a shared whiteboard, including squares, circles, lines, and text. It
 supports real-time collaboration and includes role-based access controls to manage user permissions effectively. This project
 demonstrates proficiency in full-stack development, real-time communication technologies, and secure access management.

<p align="right">(<a href="#top">back to top</a>)</p>



### Technolgy Used

The following technologies and tools have been equipped to develop this project -

* MERN: MongoDB, Express, ReactJS, Node JS
* SocketIO
* Rough JS

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.



* Node JS should be installed as prerequisites
* npm 
  ```sh
  npm install npm@latest -g
  ```
* MongoDB Setup
* Run front end Application with 
    ```
    cd frontend
    npm install
    npm start
    ```
* Run backend application with 
    ```
    cd server
    npm install
    npm start
    ```
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Features -->
## Features

- **Authentication & Authorization:** Registration and login are required with proper validation to access the boards and features.
- **Multiple Whiteboards:** Users can create and manage more than one whiteboard, and share them with other users.
- **Role-Based Access:** Access to each board is role-based, enabling specific features for users based on their roles.
- **Multiple Drawing Tools:** The whiteboard supports various shapes and tools, including rectangles, circles, text, and pencils.
- **Real-Time Collaboration:** All activity on the whiteboard canvas is updated in real-time for all members viewing the board, using Socket.IO events.
- **Export Options:** Users can export the whiteboard content as an image or PDF.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Database design -->
## Database Design
database for CoSketch having below 3 documents and its respective structure mentioned below,

- Users
```json
{
	"_id": {
		"$oid": "661be3fab29b01e73b199d14"
	},
	"email": "veet2@gmail.com",
	"username": "veet2124",
	"password": "$2b$12$lNXnUpFuIyR42ZyxlQj9NOHqAGVMjlAE3gNjcqTQGwGLEdZYTVUk.",
	"firstName": "Veet",
	"role": "ADMIN",
	"lastName": "Moradiya",
	"createdAt": {
		"$date": {
			"$numberLong": "1713103843726"
		}
	},
}
```

- boards
```json
{
	"_id": {
		"$oid": "663763bf42ff898ab7b92989"
	},
	"boardTitle": "Test Board Members API",
	"boardDescription": "Test Board created via API with members",
	"members": [ // array of members with role
		{
			"memberId": {
				"$oid": "661bf4e5d6b91517e3136997"
			},
			"memberRole": "OWNER",
			"lastAccessedAt": null,
			"_id": {
				"$oid": "663763bf42ff898ab7b9298a"
			}
		},
	],
	"createdAt": {
		"$date": {
			"$numberLong": "1714906047611"
		}
	},
	"updatedAt": {
		"$date": {
			"$numberLong": "1714906047611"
		}
	}
}
```

- boardcontents
```json
{
	"_id": {
		"$oid": "663a551d81b106ac6e38ea45"
	},
	"boardId": {
		"$oid": "6626a1062377ee6823c8a12d"
	},
	"boardElements": [] // array of board elements
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Application Screenshots -->
## Application Screenshots

### Home Page
![Home page](/screenshots/home_page.png)

<p align="right">(<a href="#top">back to top</a>)</p>

### Login Registration

#### Login
![Login page](/screenshots/login_page.png)

#### Registration
![Registration page](/screenshots/registration_page.png)

<p align="right">(<a href="#top">back to top</a>)</p>

### Whiteboards

#### list of whiteboard
![List of Whiteboard](/screenshots/whiteboards.png)

#### Open board confirmation
![Open board confirmation](/screenshots/open_board_confirm.png)

#### Delete board confirmation
![Delete board confirmation](/screenshots/delete_board_confirm.png)

#### Create New Board Default
![Create New Board Default](/screenshots/create_new_board_unfilled.png)

#### Create New Board Filled
![Create New Board Filled](/screenshots/create_new_board_filled.png)
<p align="right">(<a href="#top">back to top</a>)</p>


### Profile
![Profile](/screenshots/profile_page.png)

<p align="right">(<a href="#top">back to top</a>)</p>

### Navbar
![Navbar](/screenshots/navbar_opened.png)

### Whiteboard UIs

#### Whiteboard Open UI
![Whiteboard Open UI](/screenshots/wb_opened_ui.png)

#### Whiteboard Info Modal
![Whiteboard Info Modal](/screenshots/wb_info_modal.png)

#### Whiteboard Active Members Info
![Whiteboard Active Members Info](/screenshots/wb_active_members_modal.png)

<p align="right">(<a href="#top">back to top</a>)</p>

### Logout

#### Logout Confirm Dialog
![Logout confirm dialog](/screenshots/logout_confirm_dialog.png)

<p align="right">(<a href="#top">back to top</a>)</p>

#### Swagger UI
![Swagger UI](/screenshots/swagger_doc_ss.png)

<p align="right">(<a href="#top">back to top</a>)</p>


## Future Enhancements

<ul>
    <li>More options for board menu</li>
    <li>logging in backend application with log file.
</li>
    <li>Dockerize front end and backend application with DockerFile and simulate deployment using docker based deployment
</li>
</ul>

<p align="right">(<a href="#top">back to top</a>)</p>


