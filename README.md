# Famous Birthdays API

The Famous Birthdays API is a simple and fun tool that provides information about famous people born on each day after the year 1800 AD. This API is designed to make it easy for developers to integrate into their applications or websites, adding a touch of entertainment and historical knowledge.

## Features

-   Retrieve a list of famous people born on a specific day, along with their birth year.
-   Access a Wikipedia link for additional information about each famous person.
-   Explore historical figures, celebrities, and notable personalities from different time periods.

## Usage

### Request

To retrieve information about famous people born on a specific day, make a GET request to the following endpoint:

```
GET /api/v1/birthdays/?day=16&month=8
```

-   `day` (required): The day of the month for which you want to retrieve birthdays (1 to 31).
-   `month` (required): The month (1 to 12).

### Response

The API will respond with a Array of JSON object containing the following information:

-   `id`: Id of each document.
-   `day`: The day of the month.
-   `name`: Name of person.
-   `month`: The month.
-   `year`: The birth year.
-   `desc`: Description of person.
-   `wiki`: An array of famous people born on the specified day, including their names and professions.

Example Response:

```json
{
    "day": 1,
    "name": "Arthur Hugh Clough",
    "month": "january",
    "year": 1819,
    "desc": " English poet friend of Matthew Arnold born in Liverpool England (d. 1861)",
    "wiki": "https://en.wikipedia.org/wiki/Arthur_Hugh_Clough",
    "id": "989856cfe"
  },
```

## Accessing API

The API will be accessible at `http://localhost:3000`.

## Contributing

We welcome contributions! If you'd like to improve the API, add new features, or fix bugs, please fork this repository, make your changes, and submit a pull request.
