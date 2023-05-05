import axios from "axios";
import { useEffect, useState } from "react";
import ShopCard from "./ShopCard";
import TitleCard from "../../components/Cards/TitleCard";
import AdminHeader from "../../components/header/AdminHeader";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AllShops() {
  const [data, setList] = useState([]);
  const [value, setValue] = React.useState(0);

  let token = localStorage.getItem("token");

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    let url = `http://localhost:2000/api/shop/getShops?token=${token}`;
    axios
      .get(url)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => console.log("err", err));
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  if (value === 0) {
    data.filter(e => e.Status === "APPROVED")
  }

  console.log("data", data);
  return (
    <>
      <AdminHeader />
      <TitleCard name={"Shops"} />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="container mx-auto">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
            <Tab label="Approved" {...a11yProps(0)} />
            <Tab label="Pending" {...a11yProps(1)} />
            <Tab label="Rejected" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <section class="text-gray-600 body-font my-10">
            <div class="container px-5 mx-auto">
              <div class="flex flex-wrap -m-4">
                {data.filter(e => e.Status === "APPROVED").length ? data.filter(e => e.Status === "APPROVED").map((i) => (
                  <ShopCard
                    id={i["_id"]}
                    shopName={i["shopName"]}
                    shopNo={i["shopNumber"]}
                    floorNo={i["floorNumber"]}
                    name={
                      i["ownerPersonalInformation"]["firstName"] +
                      i["ownerPersonalInformation"]["lastName"]
                    }
                    cnic={i["ownerPersonalInformation"]["cnic"]}
                    shopType={i["userType"]}
                    load={load}
                  />
                )) :
                  <>
                    No Shops Approved</>
                }
              </div>
            </div>
          </section>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <section class="text-gray-600 body-font my-10">
            <div class="container px-5 mx-auto">
              <div class="flex flex-wrap -m-4">
                {data.filter(e => e.Status === "PENDING").length ? data.filter(e => e.Status === "PENDING").map((i) => (
                  <ShopCard
                    id={i["_id"]}
                    shopName={i["shopName"]}
                    shopNo={i["shopNumber"]}
                    floorNo={i["floorNumber"]}
                    name={
                      i["ownerPersonalInformation"]["firstName"] +
                      i["ownerPersonalInformation"]["lastName"]
                    }
                    cnic={i["ownerPersonalInformation"]["cnic"]}
                    shopType={i["userType"]}
                    isPending={true}
                    load={load}
                  />
                )) :
                  <>
                    No Shops Pending</>
                }
              </div>
            </div>
          </section>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <section class="text-gray-600 body-font my-10">
            <div class="container px-5 mx-auto">
              <div class="flex flex-wrap -m-4">
                {data.filter(e => e.Status === "REJECTED").length ? data.filter(e => e.Status === "REJECTED").map((i) => (
                  <ShopCard
                    id={i["_id"]}
                    shopName={i["shopName"]}
                    shopNo={i["shopNumber"]}
                    floorNo={i["floorNumber"]}
                    name={
                      i["ownerPersonalInformation"]["firstName"] +
                      i["ownerPersonalInformation"]["lastName"]
                    }
                    cnic={i["ownerPersonalInformation"]["cnic"]}
                    shopType={i["userType"]}
                    load={load}
                  />
                )) :
                  <>
                    No Shops Rejected</>
                }
              </div>
            </div>
          </section>
        </TabPanel>
      </Box>
    </>
  );
}
