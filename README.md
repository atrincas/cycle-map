# CycleMap

## Usefull commands

### Quickstart

```bash
# install dependencies
yarn install
# run on localhost:3000
yarn dev
```

### Run unit tests

```bash
yarn test
```

### Check test coverage

```bash
yarn coverage
```

## Initial ideas

Based on the requirements and after inspecting the citybikes API I decided on the following things:

- Break down the application views (MainView and DetailView) into seperate feature branches.
- Divide my workflow for each feature branch into 3 main parts:
  1.  Minimal working implementation of each of the technical requirements (following TDD with unit
      tests allong the way).
  2.  Add integration with Mapbox.
  3.  Add the correct styling.
- From my observation of the API endpoints and how it should be implemented I came up with the
  following idea for each page:
  - MainView: Fetch the data on the server side (SSR), and handle the filtering on the
    frontend/client side.
  - DetailView: Fetch data with a synching mechanism, since ideally you want the data to be up to
    date (using the timestamp property). I will use react query library to implement this.

## Feature branches

### Main view

#### Minimal requirements

- [x] Fetch data from citybike API and store in the client, use mock data to replicate api response
      in dev mode.
- [x] Render Header with logo, title and description.
- [x] Render SearchComponent with TextInput and country filter Combobox.
- [] Render paginated NetworksList (list of networks).
- [] Render list of NetworkCards that is a clickable link to DetailView page, and should have:
  - name
  - location (city + country)
  - truncated overview of company names
  - arrow icon
- [] SearchComponent TextInput is performed against name and companies in the NetworksList.
- [] Filter NetworksList based on search query, selection should be stored as query param in URL.
- [] Filter NetworksList based on country, selection should be stored as query param in URL.
- [] \*Divide NetworksList items with Pagination if needed, selection should be stored as query
  param in URL.

#### Mapbox integration

- [] Render map showing all the bicycle networks.
- [] Centre and zoom the map if search query is used.
- [] Centre and zoom the map if country filter is selected.
- [] \*Add 'Near me' button to centre and zoom the map around the user's location.

#### Styling

- [] Apply styling according to figma files.

### Detail view

#### Minimal requirements

- [] View should be located at page route /networks/[id].
- [] Render back button to go to MainView.
- [] Render Header with the network:
  - name
  - location (city + country)
  - overview of company names
- [] Render BicycleStationsList belonging to the network with:
  - name
  - number of free bikes
  - number of slots
- [] \*Add Pagination to BicycleStationsList, selection should be stored as query param in URL.
- [] \*Add sorting of BicycleStationsList by free bikes and empty slots (ASC, DESC).

#### Mapbox integration

- [] Render map showing all the bicycle stations.
- [] Clicking on a station on the map opens a tooltip showing:
  - name
  - number of free bikes
  - number of empty slots

#### Styling

- [] Apply styling according to figma files.

\*BONUS FEATURE: Should be done last.
