import FacebookLogin from 'react-facebook-login';
 
const responseFacebook = (response) => {
  console.log(response);
}
 
function App() {
  return (
    <FacebookLogin
    appId="524924259001761"
    autoLoad={true}
    callback={responseFacebook} />
  );
}

export default App;
