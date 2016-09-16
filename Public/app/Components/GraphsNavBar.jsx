//ES6 makes you expose things to the window, similar to in Node

//Stateless components don't even have to be declared as a React Component, and ES6 syntax makes them look super clean

var GraphsNavBar = () => (
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <a className='navbar-brand' href='https://www.youtube.com/watch?v=KmtzQCSh6xk' target='_blank'>CRYPTO TRACKERRRR</a>
        </div>

        <ul className='nav navbar-nav'>
          <li className="active"><a href="/">HOME</a></li>
          <li><a href="/miners-revenue">MINING REVENUE</a></li> 
          <li><a href="/tx-value">TX VALUE</a></li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li><a href='/login'>LOGOUT &rarr;</a></li>   
        </ul>
      </div>
    </nav>
    

);
//This is the navbar on the left side of the screen which contains the transaction maker and a way to save user preferences

window.GraphsNavBar = GraphsNavBar;

        

