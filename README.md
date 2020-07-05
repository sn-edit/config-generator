# config-generator

This repository contains the config generator source code and github pages website hosted here.
With the config generator you can easily generate a config file for sn-edit, which you can then use within your workspace folder for sn-edit.

We've made this config generator because we know, that building a yaml file yourself can be cumbersome and takes too long. With a simple and easy to use UI you are now able to build your config file yourself and download it.

After downloading you just need to put it in your workspace folder in a folder called `_config/.sn-edit.yaml`. It is extremely important, to have the correct name preserved, otherwise sn-edit will not be able to load it.

Since we use yaml, for configuration purposes mainly (other formats are also possible, but not supported by us directly), indents are important. So we recommend you to use the config generator if you are not that much experienced with yaml files. Advanced users are of course free to do it manually, but still, the generator saves you time and effort.

## Building and running on localhost

First install dependencies:

```sh
yarn
```

To run it locally:

```sh
yarn start
```

To create a production build:

```sh
yarn run build-prod 
```

## Running

Open the file `docs/index.html` in your browser

## Contributions

Feel free to contribute and share useful ideas! All constructive suggestions are welcome and also feel free to contribute if you've found something that can be improved!

## Credits

Base structure made by [@0x111](https://github.com/0x111) and a lot of thanks to [@isger](https://github.com/isger) for the design and making the site more user friendly!

