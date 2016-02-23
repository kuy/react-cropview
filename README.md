[![NPM Package][npm_img]][npm_site]
[![Dependency Status][david_img]][david_site]

# react-cropview

A [React](https://facebook.github.io/react/) component providing a cropped view for large contents and making it draggable.

## Installation

**NOTICE**: This module is still **alpha** quality.

```
npm install --save react-cropview
```

## Example

Please check out [examples](https://github.com/kuy/react-cropview/tree/master/example) directory.

## Usage

It's very simple. Just wrap your content with `<CropView>` component.

```
import CropView from 'react-cropview';

// ...

render() {
  return <div>
    <Cropview width={320} height={240}>
      <img src="large.jpg" alt="image" />
    </Cropview>
  </div>:
}
```

## API

### `<Cropview />`

+ `name` *(`string`)*: 
+ `width` *(`string`|`number`)* **[required]** :
+ `height` *(`string`|`number`)* **[required]** :
+ `constraint` *(`boolean`)*: Prevent over dragging. Default is `true`.
+ `centering` *(`boolean`)*: Centering content in default. Default is `true`.
+ `measureOn` *(`string`)*: `hover` or `mount`. Default is `mount`.

## Development

### Setup

```
npm install
npm run build
```

### Start dev server for example

```
npm start
```

Open `http://localhost:8080/webpack-dev-server/` for auto-reloading.
If you want to debug with React Dev Tools, `http://localhost:8080/` will be preferred.

## Changelog

See the [Releases](https://github.com/kuy/react-cropview/releases) page on GitHub.

## License

MIT

## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)

[npm_img]: https://img.shields.io/npm/v/react-cropview.svg
[npm_site]: https://www.npmjs.org/package/react-cropview
[david_img]: https://img.shields.io/david/kuy/react-cropview.svg
[david_site]: https://david-dm.org/kuy/react-cropview
