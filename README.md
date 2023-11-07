# Ion Propulsion

# ℹ️ About
This project consists of managing the loading of unmanned space vehicles using ion propulsion on different planets.

# 🛠️ Technologies Used

- Node.js
- TypeScript
- Prisma
- PostgreSQL
- GraphQL
- ApolloServer
- Docker
- Jest

# 🐳 Docker

- Docker
- Docker Compose

Commands to run:

1. Create a Docker image:

        docker build -t backend .

2. Start the services defined in the "docker-compose.yml" file in Docker containers.

        docker-compose up

If you want to see the database through pgadmin, you can log in to **http://localhost:8081**, using the Email: **example@example.com** and Password: **123** (this data is contained in the docker compose file).

# ⚙️ How to run the project

1. Clone this repository:

        git clone https://github.com/natividadesusana/backend-challenge.git

2. Install PostgreSQL database:

    [Download and Install PostgreSQL](https://www.postgresql.org/)

3. Install the dependencies:

        npm install

4. Generate and apply migrations to the project:

        npx prisma migrate dev

5. To confirm again, generate PrismaClient:

        npx prisma generate

6. You will see that the Seed seed data file has been generated. This is just some example data to get started with the populated bank. If you need to populate the bank again at another time, run the command:

       npx prisma db seed

8. Run the development server:

       npm run dev

9. Access the application on your local machine via the console message:

       Server ready at http://localhost:3000/

10. Go to the **"Query your server"** link mentioned in the console message.

11.  In the "Operation" section, paste the Query below:

          query SuitablePlanets {
            suitablePlanets {
              name
              mass
              hasStation
            }
          }

The Response will include data on suitable planets.

    {
      "data": {
        "suitablePlanets": [
          {
            "name": "18 Del",
            "mass": 10.3,
            "hasStation": false
          },
          {
            "name": "11 Com",
            "mass": 17.1,
            "hasStation": false
          },
          ...
        }
      }

12. In the "Operation" section, paste the Mutation below:

        mutation InstallStation($name: String!, $planet: String!) {
          installStation(input: { name: $name, planet: $planet }) {
            name
            planet {
              name
            }
          }
        }

  In Variables paste the script below:

    {
      "name": "Station for 18 Del",
      "planet": "18 Del"
    }

 In the "Variables" section, provide input data:

    {
      "data": {
        "installStation": {
          "name": "Station for 18 Del",
          "planet": {
            "name": "18 Del"
          }
        }
      }
    }

 The Response will show that a station has been installed on the specified planet.

13. In the "Operation" section, paste the Query below:
    
        query Stations{
          stations {
            id
            name
            planet {
              name
            }
          }
        }

The Response will list all stations installed on the planets.

      "data": {
        "stations": [
          {
            "id": "1",
            "name": "Station 1",
            "planet": {
              "name": "Planet 1"
            }
          },
          {
            "id": "2",
            "name": "Station 2",
            "planet": {
              "name": "Planet 2"
            }
          },
           {
            "id": "3",
            "name": "Station for 18 Del",
            "planet": {
              "name": "18 Del"
            }
            }
          ]
        }
      }

14. In the "Operation" section, paste the Mutation below:

        mutation User($username: String!) {
          user(input: { username: $username }) {
            id
            username
          }
        }

In the "Variables" section, provide input data:

    {
      "username": "Clodovaldo"
    }

 The Response will indicate the user has been created with the specified username.

    {
      "data": {
        "user": {
          "id": "3",
          "username": "Clodovaldo"
        }
      }
    }

15. In the "Operation" section, paste the Mutation below:

        mutation Recharge($stationId: Int!, $datetime: String!, $userId: Int!) {
          recharge(input: {
            stationId: $stationId,
            datetime: $datetime,
            userId: $userId  
          }) {
            id
            datetime
            user {
              id
              username
            }
          }
        }
    
In the "Variables" section, provide input data:

    {
      "stationId": 3,
      "datetime": "2023-10-11 10:30:00",
      "userId": 3
    }

 The Response will show that a recharge has been initiated.
   
    {
      "data": {
        "recharge": {
          "id": "3",
          "datetime": "2023-11-11 11:45:00",
          "user": {
            "id": "3",
            "username": "Zé"
          }
        }
      }
    }

### Deploy Project

You can access the deploy of the project deployed at:

📌 [Access the project here](https://backend-challenge-7zkr.onrender.com/)

#### Happy coding and may your journey to the stars be filled with success and endless discoveries! 🚀🌌

    
