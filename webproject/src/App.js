import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase.js";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  
  //addlisting portion
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [construction, setConstruction] = useState("");
  const [rate, setRate] = useState("");
  const [imagelink, setImageLink] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const recCollectionRef = collection(db, "Featured");
  const recCollectionRef2 = collection(db, "Users");
  const adduser = async () => {
    if(fullname !== "" && email !== ""){
    await addDoc(recCollectionRef2, {
      fullname: fullname,
      email: email,
    });
    alert("User has been added to the Database");
    setFullname("");
    setEmail("");
  } else {
    alert("Please fill all the fields");
  }
  } 
  const createListing = async () => {
    if(name !== "" && type !== "" && area !== "" && rooms !== "" && construction !== "" && rate !== "" && imagelink !== ""){
    await addDoc(recCollectionRef, {
      name: name,
      type: type,
      area: area,
      rooms: rooms,
      construction: construction,
      rate: rate,
      imagelink: imagelink,
    });
    alert("House has been added to the Featured List");
    setName("");
    setType("");
    setArea("");
    setRooms("");
    setConstruction("");
    setRate("");
    setImageLink("");
    toggleModal();
    getall();
  } else {
    alert("Please fill all the fields");
  }
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const [featured, setfeatured] = useState(null);
  const [rent, setrent] = useState(null);
  const [sale, setsale] = useState(null);
  const [over, setOver] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  async function getall() {
    const featuredSnapshot = await getDocs(collection(db, "Featured"));
    setfeatured(
      featuredSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    const rentSnapshot = await getDocs(collection(db, "Rent"));
    setrent(rentSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    const saleSnapshot = await getDocs(collection(db, "Sold"));
    setsale(saleSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  useEffect(() => {
    getall();
  }, []);
  return (
    <div style={{}}>
      {/*//<p>{JSON.stringify(featured)}</p> */}
      <div className="headerbgImage">
        <div className="header">
          <div className="headerbar">
            <div className="headerImg">
              <img
                src="https://homepress.stylemixthemes.com/wp-content/uploads/2018/12/logo-white.svg"
                alt="HomePress"
              />
            </div>
            <ul className="headerButtons">
              <li className="headerButton">
                HOME
                <ul id="submenu">
                  <li>
                    <a href="/">Main Demo</a>
                  </li>
                  <li>
                    <a href="/">Short Homepage</a>
                  </li>
                  <li>
                    <a href="/">Classic Homepages</a>
                  </li>
                  <li>
                    <a href="/">Homepage Marketplace</a>
                  </li>
                  <li>
                    <a href="/">Home Property Slider</a>
                  </li>
                </ul>
              </li>
              <li className="headerButton">
                LISTING
                <ul id="submenu">
                  <li>
                    <a href="/">Main Demo</a>
                  </li>
                  <li>
                    <a href="/">Short Homepage</a>
                  </li>
                  <li>
                    <a href="/">Classic Homepages</a>
                  </li>
                  <li>
                    <a href="/">Homepage Marketplace</a>
                  </li>
                  <li>
                    <a href="/">Home Property Slider</a>
                  </li>
                </ul>
              </li>
              <li className="headerButton">
                PROPERTY
                <ul id="submenu">
                  <li>
                    <a href="/">Main Demo</a>
                  </li>
                  <li>
                    <a href="/">Short Homepage</a>
                  </li>
                  <li>
                    <a href="/">Classic Homepages</a>
                  </li>
                  <li>
                    <a href="/">Homepage Marketplace</a>
                  </li>
                  <li>
                    <a href="/">Home Property Slider</a>
                  </li>
                </ul>
              </li>
              <li className="headerButton">
                PAGES
                <ul id="submenu">
                  <li>
                    <a href="/">Main Demo</a>
                  </li>
                  <li>
                    <a href="/">Short Homepage</a>
                  </li>
                  <li>
                    <a href="/">Classic Homepages</a>
                  </li>
                  <li>
                    <a href="/">Homepage Marketplace</a>
                  </li>
                  <li>
                    <a href="/">Home Property Slider</a>
                  </li>
                </ul>
              </li>
              <li className="headerButton">
                IDX PAGES
                <ul id="submenu">
                  <li>
                    <a href="/">Main Demo</a>
                  </li>
                  <li>
                    <a href="/">Short Homepage</a>
                  </li>
                  <li>
                    <a href="/">Classic Homepages</a>
                  </li>
                  <li>
                    <a href="/">Homepage Marketplace</a>
                  </li>
                  <li>
                    <a href="/">Home Property Slider</a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="headerSubButtons">
              <button
                className="listingbutton"
                onMouseOver={() => setOver(true)}
                onMouseOut={() => setOver(false)}
                onClick={toggleModal}
              >
                <img
                  alt=""
                  className="listingimg"
                  src={
                    !over
                      ? require("./imgs/newwhite.png")
                      : require("./imgs/new.png")
                  }
                />
                ADD LISTING
              </button>
                {modal && (
                  <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-content">
                      <h2>Add a House Listing in Featured</h2>
                      <div className="addlisting">
                        <div className="addlistingform">
                          <input
                            type="text"
                            placeholder="Enter House Name"
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Enter House Type(Sublet,Virtual,Coworking)"
                            className="input"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Enter House Area in sqft"
                            className="input"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Enter the Number of Rooms"
                            className="input"
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Enter the Year of Construction"
                            className="input"
                            value={construction}
                            onChange={(e) => setConstruction(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Enter Rent Rate per Month"
                            className="input"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Enter Image Link"
                            className="input"
                            value={imagelink}
                            onChange={(e) => setImageLink(e.target.value)}
                          />
                          <button
                            className="addlistingbutton"
                            onClick={() => createListing()}
                          >
                            Add Listing
                          </button>
                        </div>
                      </div>
                      <button className="close-modal" onClick={toggleModal}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
              <button className="roundsubbuttons">
                <img
                  alt=""
                  className="listingimg"
                  src={require("./imgs/retweet.png")}
                />
              </button>
              <button className="roundsubbuttons">
                <div>
                  <img
                    alt=""
                    className="listingimg"
                    src={require("./imgs/heart.png")}
                  />
                </div>
              </button>
              <button className="roundsubbuttons">
                <img
                  alt=""
                  className="listingimg"
                  src={require("./imgs/user.png")}
                />
              </button>
            </div>
          </div>
          <div className="headerContent">
            <div className="headerText">
              <h3 style={{ letterSpacing: "4px", fontSize: "16px" }}>
                THE BEST WAY TO
              </h3>
              <h1 style={{ fontSize: "44px", letterSpacing: "-0.5px" }}>
                Find Your Perfect Home
              </h1>
            </div>
            <div className="threebuttonparent">
                <button className="threebuttons">Buy</button>
                <div class="vl2"></div>
                <button className="threebuttons">Rent</button>
                <div class="vl2"></div>
                <button className="threebuttons">Sell</button>
              </div>
              <div className="searchdiv">
                  <div className="searchbar">
                    <input
                      type="text"
                      placeholder="Search for a Property"
                      className="searchinput"
                    />
                  </div>
                  <button className="searchbutton">Search</button>
              </div>
          </div>
        </div>
      </div>
      <div className="containers">
        <div className="containerTitle">
          <h1>Explore the Neighborhoods</h1>
        </div>
        <div className="cities">
          <div className="city">
            <img
              alt=""
              className="cityimg"
              src="https://homepress.stylemixthemes.com/wp-content/uploads/2019/06/region_static_map_512_618_1561445085-600x450.jpg"
            />
            <div className="citydetails">
              <h3>Cleveland</h3>
              <p>Listings: 2</p>
              <p>Price: $4200 - $450000</p>
            </div>
          </div>
          <div className="city">
            <img
              alt=""
              className="cityimg"
              src="https://homepress.stylemixthemes.com/wp-content/uploads/2019/06/region_static_map_513_3960_1561445103-600x450.jpg"
            />
            <div className="citydetails">
              <h3>Las Vegas</h3>
              <p>Listings: 3</p>
              <p>Price: $900 - $300000</p>
            </div>
          </div>
          <div className="city">
            <img
              alt=""
              className="cityimg"
              src="https://homepress.stylemixthemes.com/wp-content/uploads/2019/06/region_static_map_514_4458_1561445160-600x450.jpg"
            />
            <div className="citydetails">
              <h3>Los Angeles</h3>
              <p>Listings: 4</p>
              <p>Price: $800 - $150000</p>
            </div>
          </div>
          <div className="city">
            <img
              alt=""
              className="cityimg"
              src="https://homepress.stylemixthemes.com/wp-content/uploads/2019/06/region_static_map_515_1429_1561445190-600x450.jpg"
            />
            <div className="citydetails">
              <h3>PhilaDelphia</h3>
              <p>Listings: 3</p>
              <p>Price: $600 - $125,000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="containers2">
        <div className="containerTitle2">
          <h1>Featured Properties</h1>
          <p className="subtext">1,300+ Available Properties</p>
        </div>
        <div className="slider">
          <Slider {...settings}>
            {featured &&
              featured.map((e) => (
                <div className="property" key={e.id}>
                  <img alt="" className="cityimg" src={e.imagelink} />
                  <div className="propertydetails">
                    <h3>{e.name}</h3>
                    <p>
                      {e.type} &emsp;&emsp;&emsp;&emsp;-&emsp;&emsp;&emsp;&emsp;{" "}
                      {e.area} Sq ft
                    </p>
                    <p>
                      {e.rooms} Rooms
                      &emsp;&emsp;&emsp;&emsp;-&emsp;&emsp;&emsp;&emsp;{" "}
                      {e.construction}
                    </p>
                    <div className="hrStyle">
                      <hr width="100%" />
                    </div>
                    <p>${e.rate}/mo</p>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
      <div className="containers">
        <div className="containerTitle2">
          <h1>Recent Properties for Sale</h1>
          <p className="subtext">All Properties for Sale</p>
        </div>
        <div className="cities">
          {sale &&
            sale.map((e) => (
              <div className="property" key={e.id}>
                <img alt="" className="cityimg" src={e.imagelink} />
                <div className="citydetails">
                  <h3>{e.name}</h3>
                  <p>
                    ${e.rate}/mo&emsp;&emsp;&emsp;-&emsp;&emsp;&emsp; Area:{" "}
                    {e.area} sqft
                  </p>
                  <div className="hrStyle">
                    <hr width="100%" />
                  </div>
                  <p>
                    {e.rooms} rooms &emsp;&emsp;&emsp;-&emsp;&emsp;&emsp;
                    {e.bath} baths <br />
                    {e.construction} &emsp;&emsp;&emsp;-&emsp;&emsp;&emsp;
                    {e.garage} garage
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="hrStyle">
        <hr width="70%" />
      </div>
      <div className="containers">
        <div className="containerTitle2">
          <h1>Recent Properties for Rent</h1>
          <p className="subtext">All Properties for Rent</p>
        </div>
        <div className="cities">
          {rent &&
            rent.map((e) => (
              <div className="property" key={e.id}>
                <img alt="" className="cityimg" src={e.imagelink} />
                <div className="citydetails">
                  <h3>{e.name}</h3>
                  <p>
                    ${e.rate}/mo &emsp;&emsp;&emsp;-&emsp;&emsp;&emsp;Area:{" "}
                    {e.area} sqft
                  </p>
                  <div className="hrStyle">
                    <hr width="100%" />
                  </div>
                  <p>
                    {e.rooms} rooms &emsp;&emsp;&emsp;-&emsp;&emsp;&emsp;
                    {e.bath} baths <br />
                    {e.construction} &emsp;&emsp;&emsp;-&emsp;&emsp;&emsp;
                    {e.garage} garage
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="newContainerbg">
        <div className="newContainer">
          <div className="adverts">
            <img alt="" src={require("./imgs/homesearch.png")} />
            <div className="adverttext">
              <a href="//">Looking for a new home?</a>
              <p>
                10 new offers every day. 350 offers on site, trusted by a
                community of thousands of users.
              </p>
            </div>
          </div>
        </div>
        <div className="newContainer">
          <div className="adverts">
            <img alt="" src={require("./imgs/homesell.png")} />
            <div className="adverttext">
              <a href="//">Looking for a new home?</a>
              <p>
                10 new offers every day. 350 offers on site, trusted by a
                community of thousands of users.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="thirdcontainer">
        <div className="propcity">
          <h1>Properties By Cities</h1>
          <div className="upper">
            <div className="uppercities">
              <div className="child city1">
                <div className="childtext">
                  <h3>Los Angeles</h3>
                  <p>12 PROPERTIES</p>
                </div>
              </div>
            </div>
            <div className="uppercities">
              <div className="child city2">
                <div className="childtext">
                  <h3>Philadelphia</h3>
                  <p>14 PROPERTIES</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lower">
            <div className="lowercities">
              <div className="child city3">
                <div className="childtext">
                  <h3>Las Vegas</h3>
                  <p>9 Properties</p>
                </div>
              </div>
            </div>
            <div className="lowercities">
              <div className="child city4">
                <div className="childtext">
                  <h3>San Francisco</h3>
                  <p>28 Properties</p>
                </div>
              </div>
            </div>
            <div className="lowercities">
              <div className="child city5">
                <div className="childtext">
                  <h3>Sacramento</h3>
                  <p>7 Properties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="otherhalfcontainer">
        <h1>Why Choose Us</h1>
        <div className="choosedivs">
          <div className="choose">
            <img src={require("./imgs/trusted.png")} alt="" />
            <div className="choosetext">
              <h3>Trusted Agents</h3>
              <p>
                10 new offers every day. 350 offers on site, trusted by a
                community of thousands of users.
              </p>
            </div>
          </div>
          <div className="choose">
            <img src={require("./imgs/wide.png")} alt="" />
            <div className="choosetext">
              <h3>Wide Range of Properties</h3>
              <p>
                With a robust selection of popular properties on hand, as well
                as leading properties from real estate experts.
              </p>
            </div>
          </div>
          <div className="choose">
            <img src={require("./imgs/financing.png")} alt="" />
            <div className="choosetext">
              <h3>Financing Made Easy</h3>
              <p>
                Our stress-free finance department that can find financial
                solutions to save you money.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="registercontainer">
        <img
          className="registerimage"
          src={require("./imgs/agent.png")}
          alt=""
        />
        <h1>Become a Real Estate Agent</h1>
        <button
          className="registerbutton"
          onMouseOver={() => setOver(true)}
          onMouseOut={() => setOver(false)}
        >
          <img
            src={
              over
                ? require("./imgs/user.png")
                : require("./imgs/userblack.png")
            }
            alt=""
          />
          REGISTER NOW
        </button>
      </div>
      <div className="partners">
        <h1>Our Partners</h1>
        <div className="animatedpartners">
          <img
            alt=""
            src="https://homepress.stylemixthemes.com/wp-content/uploads/elementor/thumbs/partner_one-o9msuoa20z56rsfxhjopdagsv8asjv0t098ji4smjw.png"
          />
          <img
            alt=""
            src="https://homepress.stylemixthemes.com/wp-content/uploads/elementor/thumbs/partner_two-o9msi37uie4ovbhuht2fo89jkxopdedvosuyzmsrc4.png"
          />
          <img
            alt=""
            src="https://homepress.stylemixthemes.com/wp-content/uploads/elementor/thumbs/partner_three-o9mss45vgj07c0apu1uasaws3jkqlwu89ontqkriuq.png"
          />
          <img
            alt=""
            src="https://homepress.stylemixthemes.com/wp-content/uploads/elementor/thumbs/partner_four-o9msi0ec3l9gxlx76ssae14ugvoln198795yekyu0s.png"
          />
        </div>
      </div>
      <div className="linkscontainer">
        <div className="links">
          <div className="linkscolumn">
            <h2>Popular Searches</h2>
            <ul>
              <li>
                <a href="/">Apartment for Rent</a>
              </li>
              <li>
                <a href="/">Apartment Low to hide</a>
              </li>
              <li>
                <a href="/">Offices for Rent</a>
              </li>
              <li>
                <a href="/">Offices for Buy</a>
              </li>
            </ul>
          </div>
          <div className="linkscolumn">
            <h2>Homepress Markets</h2>
            <ul>
              <li>
                <a href="/">Apartment for Rent</a>
              </li>
              <li>
                <a href="/">Apartment Low to hide</a>
              </li>
              <li>
                <a href="/">Offices for Rent</a>
              </li>
              <li>
                <a href="/">Offices for Buy</a>
              </li>
            </ul>
          </div>
          <div className="linkscolumn">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="/">Apartment for Rent</a>
              </li>
              <li>
                <a href="/">Apartment Low to hide</a>
              </li>
              <li>
                <a href="/">Offices for Rent</a>
              </li>
              <li>
                <a href="/">Offices for Buy</a>
              </li>
            </ul>
          </div>
          <div className="linkscolumn">
            <h3>Subscribe</h3>
            <input type="text" placeholder="Enter Your Full Name" className="newsletter" value={fullname} onChange={(e) => setFullname(e.target.value)}/>
            <input type="text" placeholder="Enter Your Email" className="newsletter" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button className="newsletterbutton" onClick={() => adduser()}>SUBSCRIBE</button>
          </div>
        </div>
        <div className="horizontallinks">
          <a href="/">Front Page</a>
          <div class="vl"></div>
          <a href="/">About us</a>
          <div class="vl"></div>
          <a href="/">Contact Us</a>
          <div class="vl"></div>
          <a href="/">News</a>
          <div class="vl"></div>
          <a href="/">Typography</a>
          <div class="vl"></div>
          <a href="/">Wishlist</a>
        </div>
        <div className="hrStyle">
          <hr width="80%" />
        </div>
        <div className="footer">
          <p>
            Copyright © 2022. HomePress – Real Estate WordPress Theme by
            StylemixThemes.
          </p>
          <img src={require("./imgs/socials.png")} alt="" />
        </div>
      </div>
    </div>
  );
};

export default App;
