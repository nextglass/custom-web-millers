# Setup
While you can use npm to run scripts, we recommend using yarn

Follow instructions here to install yarn https://yarnpkg.com/en/docs/install

Then run yarn in menu starter directory
```sh
yarn
```

** The menu name must be "Craft Beer Menu" to display in the desired template ***

# ENV
Change the .env to match your email and api key

# Running
```sh
yarn dev
```

# Building
```sh
yarn build
```

# Deploying

Upload the menu javascript file from the build directory onto your server.  Reference the file like this

```html
<script src="/menu.f7d8bc2b94db4fe68368.js" async defer id="menu-loader" data-location-id="your-location-id"></script>
```

Wherever you place the script file on your site is where it will output at.

