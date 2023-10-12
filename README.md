# Voltbras Ion Propulsion Challenge

# ℹ️ About
Welcome to the Voltbras Ion Propulsion Challenge! This technical challenge is all about managing the charging of unmanned space vehicles using ion propulsion on different planets.

## 🖇 Challenge Description

  The year is 2118, 100 years after the founding of Voltbras. We have expanded our business into charging management of ion propulsion unmanned space vehicles.
  The Ion Thruster is one of several types of space propulsion, which uses beams of light based on electrical energy (that's where Voltbras comes in, we will supply this energy).
  Specifically, this energy propulsion must come from nuclear fuel, as the propulsion force is very strong.
  If the fuel is inserted on a low-gravity planet, nuclear fuel fission occurs and a lot of energy potential is lost.
  That's why we need to refuel ships on planets with high gravity, where refueling can be 100 times more efficient.
  Your job is to discover which planets Voltbras can install its new charging stations on and optimize the charging experience for space travelers.

  For that:
  
  1. Use NASA's exoplanet API, where you can consult its documentation and common queries, which allows you to search for planets outside the solar system!
  2. Only show planets with high gravity, the data does not show exactly what gravity the planet has, but Voltbras did the calculations and the ideal planets (with high gravity) are approximately the same ones that have a mass greater than 10 Jupiter mass (exoplanet .pl_bmassj)

# 🖇 Requirements

Feel free to make any of the next requirements different from what was asked as long as you can justify the change. E.g.: I didn't do the requirement in such a way because the implementation I did is more performant and secure.

1. Create a server in Node.js using Apollo GraphQL Server

2. Create the GraphQL schema with a suitablePlanets query, which returns data on planets with high gravity

3. Create a mutation installStation, which, given a planet, installs a charging station on the planet (it is suggested to create a table in some DB that stores the information on where the stations are installed)

4. Create a query stations, which will list all stations installed on the planets

5. Create a mutation recharge, which, given a station and a datetime of when the recharge will end, performs a recharge, starting from the moment the mutation was called and ending with the last datetime.
- You can only recharge at the station at a time
- This recharge must be linked to a user - feel free to implement it however you wish.
- A user can only have a maximum of one recharge in progress

6. Document your project, and explain how to run it

7. Create the project in some private repository on GitHub or GitLab

8. Send along with your challenge repository a short video demonstrating the basic functioning of the system, in a free format, showing the implemented functionalities.

# 🖇 Extras

1. Add tests using Jest or any other testing framework

2. Use Typescript

3. Install a docker-compose, which simplifies running your server and DB

4. We use prisma but feel free to use any ORM

5. Add authentication (only an authenticated user can make a top-up or reservation)

6. Create a mutation reservation, which, given a station, a user and a time interval, creates a station reservation for the user in that specific time interval.
- It must not be possible to create a reservation that conflicts with the interval of another reservation or a recharge already in progress
- To recharge a specific reservation, it is necessary to call a mutation (which could be the recharge itself or a new mutation - whichever you prefer) passing just a reservationId. Use can only occur within the reservation time frame (e.g. If the reservation was from 12:00 to 13:00, it should only be possible to use it between 12:00 and 13:00).
- Recharging a reservation must be completed at the end of the reservation interval.

7. Create a stationHistory query, where it will be possible to view the recharge history of a station (show the time, duration of the recharge and the user who carried it out)

## 🖇 NASA API data example

    [
      {
        "pl_hostname":"11 UMi",
        ...
        "pl_bmassj":14.74000,
        "pl_bmassjerr1":2.50000,
        "pl_bmassjerr2":-2.50000,
        "pl_bmassjlim":0,
        ...
      },
      ...
    ]

## 🖇 Example of your API data

    {
      suitablePlanets {
        name
        mass
        hasStation
      }
    }

Return a response:

    {
        "suitablePlanets": [
            {
                "name": "XPTO",
                "mass": 27.5,
                "hasStation": false
            },
            {
                "name": "REPOLHO",
                "mass": 52.0,
                "hasStation": true
            },
            ...
        ]
    }

## 🖇 Example of mutations

    {
      installStation(
        input: { name: "nome de exemplo", planet: "planeta de exemplo" }
      )
    }

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

    
