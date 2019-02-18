## Pokemon Tinder

[Pokemon Tinder](https://intense-anchorage-80594.herokuapp.com/) is a full stack application with classic CRUD features hosted on Heroku.

Front End: React
Backend: Node Express
Database: NoSQL (with MongoDB & Mongoose)

### Design Considerations

#### Front End

```
client
│   App.jsx
│   index.js
|   index.html
│
└───components
│   │   Board.jsx
│   │   Card.jsx
|   |   Form.jsx
│
|...
```

App.jsx is the highest level component. If we were to build out a complete Single Paged Application, would hold different page routes within App.jsx. For the sake of this exercise, it just held our Board.

Board.jsx holds most of the application logic (reading cards, dismissing/favoriting).

* **list:** (An array of objects) that holds information and order of our cards
* **index:** (Integer) Index of the list that determines which card to display
* **atEnd:** (Boolean) Tells whether we're at the end of available cards
* **edit:** (Boolean) Tells whether we should be editing or not. Needed to pass down props to our Form for editing purposes
* **form:** (Boolean) To have our scrim + form modal display or not

Form.jsx holds logic relevant to the card that we're currently editing or creating. Our form component will always be POSTing or PUTing a relevant S3 url link for the image. In the case of editing a card, we will be passing in the relevant information as props. If not, we'll start off with a blank state.

* **name:** (String) Name of our Pokemon
* **description:** (String) Description of our Pokemon
* **factoid:** (String) Factoid of our Pokemon
* **image:** (String) Image of our Pokemon (either as a link stored in S3, or a readable data:img string)
* **file:** (Object) File object of the image
* **id:** (String) Unique identifier of that card. Relevant when we're updating a card

Card.jsx is a functional presentational component that will be rendering information the image, description, and factoid.

#### Back End

Our backend is relatively straightforward with a straightforward NoSQL MongoDB database. Its model follows this schema:

* **name:** (String) Name of our Pokemon
* **description:** (String) Description of our Pokemon
* **factoid:** (String) Factoid of our Pokemon
* **image:** (String) Image of our Pokemon (either as a link stored in S3, or a readable data:img string)

The only added layer of complexity within our backend is the use of our S3 service to upload images. We have a dedicated route to upload images that returns the file location which we then use to make whatever requests to our CRUD API's.
