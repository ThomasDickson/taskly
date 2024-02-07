# taskly. 🗒️
7Day Code Challenge submission

## 💻 Project Description

A lightweight todo list application developed using ReactJS, Chakra UI, FastAPI and PostgreSQL. 

## ▶️ Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

To run the application, [Docker](https://docs.docker.com/engine/install/) must be installed. 

### Installation

```
  git clone https://github.com/ThomasDickson/taskly.git
  cd taskly
```
### Running the Application

Ensure that Docker is running, and then build the application:

```
  docker compose down
  docker compose up --build
```

Open <http://localhost:3000> in your browser to view the project.

Swagger API Documentation available at: <http://localhost:8000/docs>

### Stopping the Application

To terminate all services:

```
  docker compose down
```

## 🧪 Testing

One challenge I was not able to completely overcome within the project timeframe was integrating automated testing with pytest into the Docker build process. The following commands will launch the backend and any associated dependencies and output pytest results.


```
  docker compose run --build --rm backend sh -c "pytest tests"
  docker compose down
```

## 📝 Justifications

### Tech Stack

**FastAPI**

The backend REST API for Taskly was developed using FastAPI/Python due to its quick setup, readibility and easy integration with SQL databases. 

**ReactJS**

The frontend of Taskly was developed with ReactJS due to its developer experience and wide range of available UI libraries to streamline development.

**PostgreSQL**

I chose PostgreSQL as the database for Taskly due to its wide range of data types, such as variable-length strings and dates, as well as its easy integration with Docker.

### Design Choices

I utilised the repository pattern in my FastAPI application to follow SOLID principles and provide more modular and testable code. By abstracting database interactions into repository classes, they can be easily mocked during testing to provide more robust unit tests. 

Another consideration that had to be made was whether to handle the search/sorting logic from the frontend or backend of the application. In the context of Taskly, I decided that a hybrid approach would be most suitable, with the frontend being responsible for searching to provide a responsive UI/UX, and the backend being responsible for sorting to utilise efficient database sorting techniques.

**NOTE: I have written searching logic within the backend with tests, but it is not utilised by the application.

## 💭 Reflection

I decided to use Chakra UI due to its simplicity and aesthetically pleasing components. While initially satisfied with its capabilities, as the project progressed, I encountered limitations in the range of components provided by Chakra UI. Despite its strengths, components such as a date picker/Calendar were not readily available within the Chakra UI library and within the timeframe it was not feasible to style my own.

I learnt the importance of carefully evaluating the trade-offs when selecting a UI library or framework. While Chakra UI excels in simplicity and rapid prototyping, its components may not always cover all the requirements.




