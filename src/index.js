import * as dotenv from 'dotenv';

dotenv.config();

export default function helloWorldPlugin(args) {
  console.log({ args });
  return {
    onPreBuild: (onPreBuildArgs) => {
      console.log('Hello world from onPreBuild event!');
      console.log(onPreBuildArgs);
    },

    onPostBuild: (onPostBuildArgs) => {
      console.log('Hello world from onPostBuild event!');
      console.log(onPostBuildArgs);
    },
  };
}
