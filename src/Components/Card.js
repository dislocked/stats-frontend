import React, {useState, useEffect} from 'react'

import * as SteamID from '@node-steam/id';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';
import '../App.css';

import axios from 'axios';

import {
  fromAccountID,
  ID,
  Instance,
  Type,
  Universe,
} from '@node-steam/id';

function Card(){

    const [name, setName] = useState(0);
    const [team, setTeam] = useState(0);
    const [steamID, setSteamID] = useState(0);
    const [goals, setGoals] = useState(0);
    const [matches, setMatches] = useState(0);
    const [assists, setAssists] = useState(0);
    const [shots, setShots] = useState(0);
    const [shotsontarget, setShotsontarget] = useState(0);
    const [passes, setPasses] = useState(0);
    const [passescompleted, setPassescompleted] = useState(0);
    const [interceptions, setInterceptions] = useState(0);
    const [fouls, setFouls] = useState(0);
    const [offsides, setOffsides] = useState(0);
    const [tackles, setTackles] = useState(0);
    const [tacklescompleted, setTacklescompleted] = useState(0);
    const [possession, setPossession] = useState(0);
    const [t0, setT0] = useState(0);
    const [t1, setT1] = useState(0);
    const [t2, setT2] = useState(0);
    const [t3, setT3] = useState(0);
    const [t4, setT4] = useState(0);
    const [t0real, setT0real] = useState(true);
    const [t1real, setT1real] = useState(true);
    const [t2real, setT2real] = useState(true);
    const [t3real, setT3real] = useState(true);
    const [t4real, setT4real] = useState(true);
    const [maradei, setMaradei] = useState(0);
    const [master, setMaster] = useState(0);
    const [maradeireal, setMaradeireal] = useState(true);
    const [masterreal, setMasterreal] = useState(true);
    const [maradeiteam, setMaradeiteam] = useState(0);
    const [masterteam, setMasterteam] = useState(0);
    const [t0team, setT0team] = useState(0);
    const [t1team, setT1team] = useState(0);
    const [t2team, setT2team] = useState(0);
    const [t3team, setT3team] = useState(0);
    const [t4team, setT4team] = useState(0);



    const players = require("./players.json");
    const torneos = require("./torneos.json");
    const [playerID, setPlayerID] = useState("STEAM_0:0:41134189");
    const [tID, setTID] = useState("all");

    const [url, setCount] = useState(0);
    const [avatar, setAvatar] = useState([]);
    const idd = new ID(playerID);
    const [actualovr, setActualovr] = useState("0");
    const [id, setId] = useState(0);
  
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI('EC93B358FBCA4A90D62433C974003873');

    const AF = ((goals*15+shotsontarget+assists*10)/matches)*2.05;
    const AD = ((interceptions/matches)*2.5+(tacklescompleted/matches))*2.05;
    const CC = ((passescompleted+assists*10+possession*10)/matches)*2.05;
    const val_def = (AD * 2.8 + AF / 3 + CC / 2.5)/3;
    const val_del = ( AF * 2.8 + AD / 3 + CC / 2.5)/3;
    const val_mca = ( CC * 2.8 + AD / 4.2 + AF / 3.1) / 3;
    const val_mcd = ( CC * 2.8 + AD / 3.1 + AF / 4.2) / 3;
    const ovrT = Math.trunc((t1+t2+t3+t4)/4);
    console.log("a ver xd");
    console.log(ovrT);
    let ovr;
    let ovrt1;
    let pos;
    if(val_def>=val_del){
      if(val_def>=val_mca){
        if(val_def>=val_mcd){
          ovr = Math.trunc(val_def);
        }else{
          ovr = Math.trunc(val_mcd);
        }
      }else{
        if(val_mca>=val_mcd){
          ovr = Math.trunc(val_mca);
        }else{
          ovr = Math.trunc(val_mcd);
        }
      }
    }else{
      if(val_del>=val_mca){
        if(val_del>=val_mcd){
          ovr = Math.trunc(val_del);
        }else{
          ovr = Math.trunc(val_mcd);
        }
      }else{
        if(val_mca>=val_mcd){
          ovr = Math.trunc(val_mca);
        }else{
          ovr = Math.trunc(val_mcd);
        }
      }
    }
    console.log(actualovr);

    if(val_def>=val_del){
      if(val_def>=val_mca){
        if(val_def>=val_mcd){
          pos = "CB";
        }else{
          pos = "MCD";
        }
      }else{
        if(val_mca>=val_mcd){
          pos = "MCA";
        }else{
          pos = "MCD";
        }
      }
    }else{
      if(val_del>=val_mca){
        if(val_del>=val_mcd){
          pos = "CF";
        }else{
          pos = "MCD";
        }
      }else{
        if(val_mca>=val_mcd){
          pos = "MCA";
        }else{
          pos = "MCD";
        }
      }
    }
  
    const fetchUser = async () => {
      const apiCall = await fetch (`https://stats.iosoccer-sa.bid/api/player/${playerID}/${tID}`);
      const user = await apiCall.json();
      //call setName below to change the state 'name'
      setName(user[0].name);
      setTeam(user[0].team);
      setMatches(user[0].matches);
      setGoals(user[0].goals);
      setAssists(user[0].assists);
      setShots(user[0].shots);
      setShotsontarget(user[0].shotsontarget);
      setPasses(user[0].passes);
      setPassescompleted(user[0].passescompleted);
      setInterceptions(user[0].interceptions);
      setFouls(user[0].fouls);
      setOffsides(user[0].offsides);
      setTackles(user[0].tackles);
      setTacklescompleted(user[0].tacklescompleted);
      setPossession(user[0].possession);
      console.log(user[0]);
      console.log("XD 2!");
    }

    const fetchUser2 = async () => {
      const apiCall2 = await fetch (`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=EC93B358FBCA4A90D62433C974003873&steamids=${idd}`);
      const user2 = await apiCall2.json();
      //call setName below to change the state 'name'
      setAvatar(user2.response.players[0].avatarfull);
      console.log(user2.response.players[0].avatarfull);
      steam.resolve('https://steamcommunity.com/id/Casana').then(id => {
        //console.log(id); // 76561198146931523
        setId(idd.getSteamID64());
        console.log("XD 3!");
    });


    steam.getUserSummary('76561198146931523').then(url => {
    setCount(url.avatar.large);
    /**
    PlayerSummary {
        avatar: {
            small: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7f/7fdf55394eb5765ef6f7be3b1d9f834fa9c824e8.jpg',
            medium: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7f/7fdf55394eb5765ef6f7be3b1d9f834fa9c824e8_medium.jpg',
            large: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7f/7fdf55394eb5765ef6f7be3b1d9f834fa9c824e8_full.jpg'
        },
        steamID: '76561198146931523',
        url: 'http://steamcommunity.com/id/DimGG/',
        created: 1406393110,
        lastLogOff: 1517725233,
        nickname: 'Dim',
        primaryGroupID: '103582791457347196',
        personaState: 1,
        personaStateFlags: 0,
        commentPermission: 1,
        visibilityState: 3
    }
    */
    });
    }

    const fetcht1 = async () => {
      const apiCallt1 = await fetch (`https://stats.iosoccer-sa.bid/api/player/${playerID}/t1`);
      const usert1 = await apiCallt1.json();
      //call setName below to change the state 'name'
      if(usert1[0])
      {
      const AFT1 = ((usert1[0].goals*15+usert1[0].shotsontarget+usert1[0].assists*10)/usert1[0].matches)*2.05;
      const ADT1 = ((usert1[0].interceptions/usert1[0].matches)*2.5+(usert1[0].tacklescompleted/usert1[0].matches))*2.05;
      const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/usert1[0].matches)*2.05;
      const val_deft1 = (ADT1 * 2.8 + AFT1 / 3 + CCT1 / 2.5)/3;
      const val_delt1 = ( AFT1 * 2.8 + ADT1 / 3 + CCT1 / 2.5)/3;
      const val_mcat1 = ( CCT1 * 2.8 + ADT1 / 4.2 + AFT1 / 3.1) / 3;
      const val_mcdt1 = ( CCT1 * 2.8 + ADT1 / 3.1 + AFT1 / 4.2) / 3;
      let ovrt1;
      let pos;
      if(val_deft1>=val_delt1){
        if(val_deft1>=val_mcat1){
          if(val_deft1>=val_mcdt1){
            ovrt1 = Math.trunc(val_deft1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }else{
          if(val_mcat1>=val_mcdt1){
            ovrt1 = Math.trunc(val_mcat1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }
      }else{
        if(val_delt1>=val_mcat1){
          if(val_delt1>=val_mcdt1){
            ovrt1 = Math.trunc(val_delt1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }else{
          if(val_mcat1>=val_mcdt1){
            ovrt1 = Math.trunc(val_mcat1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }
      }
      setT1(ovrt1);
      setT1team(usert1[0].team);
      setT1real(true);
      }else{
        setT1real(false);
      }
    }

    const fetcht2 = async () => {
      const apiCallt1 = await fetch (`https://stats.iosoccer-sa.bid/api/player/${playerID}/t2`);
      const usert1 = await apiCallt1.json();
      //call setName below to change the state 'name'
      if(usert1[0])
      {
      const AFT1 = ((usert1[0].goals*15+usert1[0].shotsontarget+usert1[0].assists*10)/usert1[0].matches)*2.05;
      const ADT1 = ((usert1[0].interceptions/usert1[0].matches)*2.5+(usert1[0].tacklescompleted/usert1[0].matches))*2.05;
      const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/usert1[0].matches)*2.05;
      const val_deft1 = (ADT1 * 2.8 + AFT1 / 3 + CCT1 / 2.5)/3;
      const val_delt1 = ( AFT1 * 2.8 + ADT1 / 3 + CCT1 / 2.5)/3;
      const val_mcat1 = ( CCT1 * 2.8 + ADT1 / 4.2 + AFT1 / 3.1) / 3;
      const val_mcdt1 = ( CCT1 * 2.8 + ADT1 / 3.1 + AFT1 / 4.2) / 3;
      let ovrt1;
      let pos;
      if(val_deft1>=val_delt1){
        if(val_deft1>=val_mcat1){
          if(val_deft1>=val_mcdt1){
            ovrt1 = Math.trunc(val_deft1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }else{
          if(val_mcat1>=val_mcdt1){
            ovrt1 = Math.trunc(val_mcat1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }
      }else{
        if(val_delt1>=val_mcat1){
          if(val_delt1>=val_mcdt1){
            ovrt1 = Math.trunc(val_delt1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }else{
          if(val_mcat1>=val_mcdt1){
            ovrt1 = Math.trunc(val_mcat1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }
      }
      setT2(ovrt1);
      setT2team(usert1[0].team);
      setT2real(true)
      }else{
        setT2real(false)
      }
    }

    const fetcht3 = async () => {
      const apiCallt1 = await fetch (`https://stats.iosoccer-sa.bid/api/player/${playerID}/t3`);
      const usert1 = await apiCallt1.json();
      //call setName below to change the state 'name'
      if(usert1[0])
      {
      const AFT1 = ((usert1[0].goals*15+usert1[0].shotsontarget+usert1[0].assists*10)/usert1[0].matches)*2.05;
      const ADT1 = ((usert1[0].interceptions/usert1[0].matches)*2.5+(usert1[0].tacklescompleted/usert1[0].matches))*2.05;
      const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/usert1[0].matches)*2.05;
      const val_deft1 = (ADT1 * 2.8 + AFT1 / 3 + CCT1 / 2.5)/3;
      const val_delt1 = ( AFT1 * 2.8 + ADT1 / 3 + CCT1 / 2.5)/3;
      const val_mcat1 = ( CCT1 * 2.8 + ADT1 / 4.2 + AFT1 / 3.1) / 3;
      const val_mcdt1 = ( CCT1 * 2.8 + ADT1 / 3.1 + AFT1 / 4.2) / 3;
      let ovrt1;
      let pos;
      if(val_deft1>=val_delt1){
        if(val_deft1>=val_mcat1){
          if(val_deft1>=val_mcdt1){
            ovrt1 = Math.trunc(val_deft1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }else{
          if(val_mcat1>=val_mcdt1){
            ovrt1 = Math.trunc(val_mcat1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }
      }else{
        if(val_delt1>=val_mcat1){
          if(val_delt1>=val_mcdt1){
            ovrt1 = Math.trunc(val_delt1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }else{
          if(val_mcat1>=val_mcdt1){
            ovrt1 = Math.trunc(val_mcat1);
          }else{
            ovrt1 = Math.trunc(val_mcdt1);
          }
        }
      }
      setT3(ovrt1);
      setT3team(usert1[0].team);
      setT3real(true)
      }else{
        setT3real(false)
      }
    }
    
    const fetcht4 = async () => {
      const apiCallt1 = await fetch (`https://stats.iosoccer-sa.bid/api/player/${playerID}/t4`);
      const usert1 = await apiCallt1.json();
      //call setName below to change the state 'name'
      if(usert1[0])
      {
        const AFT1 = ((usert1[0].goals*15+usert1[0].shotsontarget+usert1[0].assists*10)/usert1[0].matches)*2.05;
        const ADT1 = ((usert1[0].interceptions/usert1[0].matches)*2.5+(usert1[0].tacklescompleted/usert1[0].matches))*2.05;
        const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/usert1[0].matches)*2.05;
        const val_deft1 = (ADT1 * 2.8 + AFT1 / 3 + CCT1 / 2.5)/3;
        const val_delt1 = ( AFT1 * 2.8 + ADT1 / 3 + CCT1 / 2.5)/3;
        const val_mcat1 = ( CCT1 * 2.8 + ADT1 / 4.2 + AFT1 / 3.1) / 3;
        const val_mcdt1 = ( CCT1 * 2.8 + ADT1 / 3.1 + AFT1 / 4.2) / 3;
        let ovrt1;
        let pos;
        if(val_deft1>=val_delt1){
          if(val_deft1>=val_mcat1){
            if(val_deft1>=val_mcdt1){
              ovrt1 = Math.trunc(val_deft1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }else{
            if(val_mcat1>=val_mcdt1){
              ovrt1 = Math.trunc(val_mcat1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }
        }else{
          if(val_delt1>=val_mcat1){
            if(val_delt1>=val_mcdt1){
              ovrt1 = Math.trunc(val_delt1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }else{
            if(val_mcat1>=val_mcdt1){
              ovrt1 = Math.trunc(val_mcat1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }
        }
        setT4(ovrt1);
        setT4team(usert1[0].team);
        setActualovr(ovrt1);
        setT4real(true)
      }else{
        setT4real(false)
      }
    }

    const fetcht0 = async () => {
      const apiCallt1 = await fetch (`https://stats.iosoccer-sa.bid/api/player/${playerID}/t0`);
      const usert1 = await apiCallt1.json();
      //call setName below to change the state 'name'
      if(usert1[0])
      {
        const AFT1 = ((usert1[0].goals*15+usert1[0].shotsontarget+usert1[0].assists*10)/usert1[0].matches)*2.05;
        const ADT1 = ((usert1[0].interceptions/usert1[0].matches)*2.5+(usert1[0].tacklescompleted/usert1[0].matches))*2.05;
        const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/usert1[0].matches)*2.05;
        const val_deft1 = (ADT1 * 2.8 + AFT1 / 3 + CCT1 / 2.5)/3;
        const val_delt1 = ( AFT1 * 2.8 + ADT1 / 3 + CCT1 / 2.5)/3;
        const val_mcat1 = ( CCT1 * 2.8 + ADT1 / 4.2 + AFT1 / 3.1) / 3;
        const val_mcdt1 = ( CCT1 * 2.8 + ADT1 / 3.1 + AFT1 / 4.2) / 3;
        let ovrt1;
        let pos;
        if(val_deft1>=val_delt1){
          if(val_deft1>=val_mcat1){
            if(val_deft1>=val_mcdt1){
              ovrt1 = Math.trunc(val_deft1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }else{
            if(val_mcat1>=val_mcdt1){
              ovrt1 = Math.trunc(val_mcat1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }
        }else{
          if(val_delt1>=val_mcat1){
            if(val_delt1>=val_mcdt1){
              ovrt1 = Math.trunc(val_delt1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }else{
            if(val_mcat1>=val_mcdt1){
              ovrt1 = Math.trunc(val_mcat1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }
        }
        setT0(ovrt1);
        setT0team(usert1[0].team);
        setT0real(true)
      }else{
        setT0real(false)
      }
    }

    const fetchmaradei = async () => {
      const apiCallt1 = await fetch (`https://stats.iosoccer-sa.bid/api/player/${playerID}/maradei`);
      const usert1 = await apiCallt1.json();
      //call setName below to change the state 'name'
      if(usert1[0])
      {
        const AFT1 = ((usert1[0].goals*15+usert1[0].shotsontarget+usert1[0].assists*10)/usert1[0].matches)*2.05;
        const ADT1 = ((usert1[0].interceptions/usert1[0].matches)*2.5+(usert1[0].tacklescompleted/usert1[0].matches))*2.05;
        const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/usert1[0].matches)*2.05;
        const val_deft1 = (ADT1 * 2.8 + AFT1 / 3 + CCT1 / 2.5)/3;
        const val_delt1 = ( AFT1 * 2.8 + ADT1 / 3 + CCT1 / 2.5)/3;
        const val_mcat1 = ( CCT1 * 2.8 + ADT1 / 4.2 + AFT1 / 3.1) / 3;
        const val_mcdt1 = ( CCT1 * 2.8 + ADT1 / 3.1 + AFT1 / 4.2) / 3;
        let ovrt1;
        let pos;
        if(val_deft1>=val_delt1){
          if(val_deft1>=val_mcat1){
            if(val_deft1>=val_mcdt1){
              ovrt1 = Math.trunc(val_deft1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }else{
            if(val_mcat1>=val_mcdt1){
              ovrt1 = Math.trunc(val_mcat1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }
        }else{
          if(val_delt1>=val_mcat1){
            if(val_delt1>=val_mcdt1){
              ovrt1 = Math.trunc(val_delt1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }else{
            if(val_mcat1>=val_mcdt1){
              ovrt1 = Math.trunc(val_mcat1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }
        }
        setMaradei(ovrt1);
        setMaradeiteam(usert1[0].team);
        setMaradeireal(true)
      }else{
        setMaradeireal(false)
      }
    }

    const fetchmaster = async () => {
      const apiCallt1 = await fetch (`https://stats.iosoccer-sa.bid/api/player/${playerID}/master`);
      const usert1 = await apiCallt1.json();
      //call setName below to change the state 'name'
      if(usert1[0])
      {
        const AFT1 = ((usert1[0].goals*15+usert1[0].shotsontarget+usert1[0].assists*10)/usert1[0].matches)*2.05;
        const ADT1 = ((usert1[0].interceptions/usert1[0].matches)*2.5+(usert1[0].tacklescompleted/usert1[0].matches))*2.05;
        const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/usert1[0].matches)*2.05;
        const val_deft1 = (ADT1 * 2.8 + AFT1 / 3 + CCT1 / 2.5)/3;
        const val_delt1 = ( AFT1 * 2.8 + ADT1 / 3 + CCT1 / 2.5)/3;
        const val_mcat1 = ( CCT1 * 2.8 + ADT1 / 4.2 + AFT1 / 3.1) / 3;
        const val_mcdt1 = ( CCT1 * 2.8 + ADT1 / 3.1 + AFT1 / 4.2) / 3;
        let ovrt1;
        let pos;
        if(val_deft1>=val_delt1){
          if(val_deft1>=val_mcat1){
            if(val_deft1>=val_mcdt1){
              ovrt1 = Math.trunc(val_deft1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }else{
            if(val_mcat1>=val_mcdt1){
              ovrt1 = Math.trunc(val_mcat1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }
        }else{
          if(val_delt1>=val_mcat1){
            if(val_delt1>=val_mcdt1){
              ovrt1 = Math.trunc(val_delt1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }else{
            if(val_mcat1>=val_mcdt1){
              ovrt1 = Math.trunc(val_mcat1);
            }else{
              ovrt1 = Math.trunc(val_mcdt1);
            }
          }
        }
        setMaster(ovrt1);
        setMasterteam(usert1[0].team);
        setMasterreal(true)
      }else{
        setMasterreal(false)
      }
    }

    useEffect(() => {
      fetchUser();
      fetchUser2();
      fetcht1();
      fetcht2();
      fetcht3();
      fetcht4();
      fetcht0();
      fetchmaradei();
      fetchmaster();
    }, [playerID])
    
    useEffect(() => {
      fetchUser();
      fetchUser2();
      fetcht1();
      fetcht2();
      fetcht3();
      fetcht4();
      fetcht0();
      fetchmaradei();
      fetchmaster();
    }, [tID])

    const data = [
      {
        data: {
          battery: 0.7,
          design: .8,
          useful: 0.9,
        },
        meta: { color: 'blue' }
      },
      {
        data: {
          battery: 0.6,
          design: .85,
          useful: 0.5,
        },
        meta: { color: 'red' }
      }
    ];
 
    const captions = {
      // columns
      battery: 'Poder Ofensivo',
      design: 'Aptitud Defensiva',
      useful: 'Participacion Juego',
    };
 

    //(`http://stats.iosoccer-sa.bid/api/player/${id}/all`)

    //<div class="stats-col-2">
    //{passescompleted}
    //<span class="player-card-stats-name"> SHT</span>
    //<br></br>
    //{passes}
    //<span class="player-card-stats-name"> STR</span>
    //<br></br>
    //{interceptions}
    //<span class="player-card-stats-name"> DEF</span>
    //</div>

    //<select
    //value={tID}
    //onChange={r => setTID(String(r.target.value))}
    //>
    //{torneos.torneos.map(torneo => (
    //  <option key={torneo.name} value={torneo.name}>
    //    {torneo.name}
    //  </option>
    //))}
   // </select>

    return(
      <div>
        <div className="content-container">
          <div className="fw-container bg-dark" style={{backgroundImage: require(`../images/banners/${team.toString().toLowerCase()}.png`)}} >
            <div className="container-large flex top-container">
              <div className="player-card player-card-shadow player-card-large bg-image2">
                <div className="player-card-position">{pos}</div>
                <div className="player-card-ovr">{ovr}</div>
                <div className="player-card-name">{name}</div>
                <img className="player-card-image-featured" src={require(`../images/cartas/${id}.png`)}></img>
                {console.log(steamID)};
                <div className="stats-col-1">
                  {Math.trunc(AF)}
                  <span className="player-card-stats-name"> AP</span>
                  <br></br>
                  {Math.trunc(AD)}
                  <span className="player-card-stats-name"> AD</span>
                  <br></br>
                  {Math.trunc(CC)}
                  <span className="player-card-stats-name"> CC</span>
                </div>
                <div className="stats-col-bg"></div>
              </div>
              <div className="top-info">
                <h1 className="top-header">
                  <span className="ovr stat_tier_3" style={{backgroundColor: ovr >= 90 ? '#02fec5': ovr >= 80 && ovr < 90 ? '#a8fe02' : ovr >= 70 && ovr < 80 ? '#fbb206' : 'red' }}>{ovr}</span>
                  <span>&nbsp;</span>{name}
                </h1>
                <h2 className="subtle-text">{name} IOSoccer {tID} Stats</h2>
                <p className="description subtle-text">{name} es un futbolista con una media de {ovr} en la posicion de {pos}. {name} es un jugador perteneciente al equipo {team} de IOSoccer.</p>
                <div>
                  <ul className="versions-list">
                    <div>
                      {t0real ? <button className="abutton" onClick={r => setTID(String("t0"))}>
                      <li className="versions-list-el">
                      <span className="stat stat_tier_2" style={{backgroundColor: t0 >= 90 ? '#02fec5': t0 >= 80 && t0 < 90 ? '#a8fe02' : t0 >= 70 && t0 < 80 ? '#fbb206' : 'red' }}>
                      {t0}</span>
                      <img className="club-flag versions-list-flag" src={require(`../images/clubs/${t0team.toString().toLowerCase()}.png`)} title={t0team} />
                      <span className="game">
                      Temporada 0</span>
                      </li>
                      </button> : null}
                    </div>
                    <div>
                    {t1real ? <button className="abutton" onClick={r => setTID(String("t1")) && setActualovr(t1)}>
                      <li className="versions-list-el">
                      <span className="stat stat_tier_2" style={{backgroundColor: t1 >= 90 ? '#02fec5': t1 >= 80 && t1 < 90 ? '#a8fe02' : t1 >= 70 && t1 < 80 ? '#fbb206' : 'red' }}>
                      {t1}</span>
                      <img className="club-flag versions-list-flag" src={require(`../images/clubs/${t1team.toString().toLowerCase()}.png`)} title={t1team} />
                      <span className="game">
                      Temporada 1</span>
                      </li>
                      </button> : null}
                    </div>
                    <div>
                      {t2real ? <button className="abutton" onClick={r => setTID(String("t2")) && setActualovr(t2)}>
                      <li className="versions-list-el">
                      <span className="stat stat_tier_2" style={{backgroundColor: t2 >= 90 ? '#02fec5': t2 >= 80 && t2 < 90 ? '#a8fe02' : t2 >= 70 && t2 < 80 ? '#fbb206' : 'red' }}>
                      {t2}</span>
                      <img className="club-flag versions-list-flag" src={require(`../images/clubs/${t2team.toString().toLowerCase()}.png`)} title={t2team} />
                      <span className="game">
                      Temporada 2</span>
                      </li>
                      </button> : null}
                    </div>
                    <div>
                      {t3real ? <button className="abutton" onClick={r => setTID(String("t3")) && setActualovr(t3)}>
                      <li className="versions-list-el">
                      <span className="stat stat_tier_2" style={{backgroundColor: t3 >= 90 ? '#02fec5': t3 >= 80 && t3 < 90 ? '#a8fe02' : t3 >= 70 && t3 < 80 ? '#fbb206' : 'red' }}>
                      {t3}</span>
                      <img className="club-flag versions-list-flag" src={require(`../images/clubs/${t3team.toString().toLowerCase()}.png`)} title={t3team} />
                      <span className="game">
                      Temporada 3</span>
                      </li>
                      </button> : null}
                    </div>
                    <div>
                      {t4real ? <button className="abutton" onClick={r => setTID(String("t4")) && setActualovr(t4)}> <li className="versions-list-el"> <span className="stat stat_tier_2" style={{backgroundColor: t4 >= 90 ? '#02fec5': t4 >= 85 && t4 < 90 ? '#a8fe02' : t4 >= 70 && t4 < 80 ? '#fbb206' : 'red' }}>
                      {t4}</span>
                      <img className="club-flag versions-list-flag" src={require(`../images/clubs/${t4team.toString().toLowerCase()}.png`)} title={t4team} />
                      <span className="game">
                      Temporada 4</span> </li> </button>: null}
                    </div>
                    <div>
                      {maradeireal ? <button className="abutton" onClick={r => setTID(String("maradei"))}>
                      <li className="versions-list-el">
                      <span className="stat stat_tier_2" style={{backgroundColor: maradei >= 90 ? '#02fec5': maradei >= 80 && maradei < 90 ? '#a8fe02' : maradei >= 70 && maradei < 80 ? '#fbb206' : 'red' }}>
                      {maradei}</span>
                      <img className="club-flag versions-list-flag" src={require(`../images/clubs/${maradeiteam.toString().toLowerCase()}.png`)} title={maradeiteam} />
                      <span className="game">
                      Copa Maradei</span>
                      </li>
                      </button> : null}
                    </div>
                    <div>
                      {masterreal ? <button className="abutton" onClick={r => setTID(String("master"))}>
                      <li className="versions-list-el">
                      <span className="stat stat_tier_2" style={{backgroundColor: master >= 90 ? '#02fec5': master >= 80 && master < 90 ? '#a8fe02' : master >= 70 && master < 80 ? '#fbb206' : 'red' }}>
                      {master}</span>
                      <img className="club-flag versions-list-flag" src={require(`../images/clubs/${masterteam.toString().toLowerCase()}.png`)} title={masterteam} />
                      <span className="game">
                      Copa Master</span>
                      </li>
                      </button> : null}
                    </div>
                  <li className="versions-list-el">
                  <button className="abutton" onClick={r => setTID(String("all"))}>
                  <span className="game">Mostrar todo</span>
                  </button>
                  </li>
                  </ul>
                  <div>
                    <select className="custom-select"
                    value={playerID}
                    onChange={e => setPlayerID(String(e.target.value))}
                    >
                    {players.players.map(player => (
                      <option key={player.steam} value={player.steam}>
                        {player.name}
                      </option>
                    ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-stats-cards-container container-large flex flex-expand">
            <div className="player-main-column player-info-column">
              <div className="hexagon-positions-container">
                <div className="hexagon-container">
                <RadarChart
                  captions={{
                  // columns
                    battery: 'AP',
                    design: 'AD',
                    useful: 'CC',
                  }}
                  data={[
                  // data
                    {
                      data: {
                        battery: ((goals*15+shotsontarget+assists*10)/matches)*2.05/100,
                        design: ((interceptions/matches)*2.5+(tacklescompleted/matches))*2.05/100,
                        useful: ((passescompleted+assists*10+possession*10)/matches)*2.05/100,
                      },
                      meta: { color: '#58FCEC' }
                    },
                  ]}
                  size={200}
                />
                </div>
                <div className="player-positions-new">
                  <div className="player-positions-row">
                    <div className="player-positions-item fw-2" style={{backgroundColor: val_del >= 85 ? '#ef1e1e': val_del >= 75 && val_del < 85 ? '#f09090' : 'white' }}> 
                      <span className="pos">CF</span>
                      <span className="stat ovr_12 stat_tier_3" style={{backgroundColor: 'rgba(250, 250, 250, 0.2)'}}>{Math.trunc(val_del)}</span>
                    </div>
                  </div>
                  <div className="player-positions-row">
                    <div className="player-positions-item" style={{backgroundColor: val_mca >= 85 ? '#88c900': val_mca >= 75 && val_mca < 85 ? '#b6c98d' : 'white' }}> 
                      <span className="pos">MCA</span>
                      <span className="stat ovr_12 stat_tier_3" style={{backgroundColor: 'rgba(250, 250, 250, 0.2)'}}>{Math.trunc(val_mca)}</span>
                    </div>
                    <div className="player-positions-item" style={{backgroundColor: val_mcd >= 85 ? '#88c900': val_mcd >= 75 && val_mcd < 85 ? '#b6c98d' : 'white' }}> 
                      <span className="pos">MCD</span>
                      <span className="stat ovr_12 stat_tier_3" style={{backgroundColor: 'rgba(250, 250, 250, 0.2)'}}>{Math.trunc(val_mcd)}</span>
                    </div>
                  </div>
                  <div className="player-positions-row">
                    <div className="player-positions-item fw-2" style={{backgroundColor: val_def >= 85 ? '#00abd2': val_def >= 75 && val_def < 85 ? '#92c6d1' : 'white' }}> 
                      <span className="pos">CB</span>
                      <span className="stat ovr_12 stat_tier_3" style={{backgroundColor: 'rgba(250, 250, 250, 0.2)'}}>{Math.trunc(val_def)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <table className="player-info">
                <tbody>
                  <tr>
                    <td>Nombre</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>Equipo</td>
                    <td>{team}</td>
                  </tr>
                  <tr>
                    <td>Partidos</td>
                    <td>{matches}</td>
                  </tr>
                  <tr>
                    <td>Posicion</td>
                    <td>{pos}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-column" style={{flexGrow: 2}}>
              <div className="stats-container">
                <h3>Habilidad</h3>
                <div className="flex flex-wrap stats-block-container">
                  <div className="stats-block">
                    <h4>
                      <span className="stat_tier_2 stat" style={{backgroundColor: AF >= 90 ? '#02fec5': AF >= 80 && AF < 90 ? '#a8fe02' : AF >= 70 && AF < 80 ? '#fbb206' : 'red' }}>{Math.trunc(AF)}</span>
                      Poder Ofensivo
                    </h4>
                    <div className="star-bar">
                      <div className="stat_tier_2" style={{width: 91}}></div>
                    </div>
                    <table className="player-stats-modern">
                      <tbody>
                        <tr>
                          <td className="stat_tier_3 stat" style={{backgroundColor: goals/matches*40 >= 90 ? '#02fec5': goals/matches*40 >= 80 && goals/matches*4 < 90 ? '#a8fe02' : goals/matches*40 >= 70 && goals/matches*40 < 80 ? '#fbb206' : 'red' }}>{Math.trunc(goals/matches*40)}</td>
                          <td>Finalizacion</td>
                        </tr>
                        <tr>
                          <td className="stat_tier_3 stat" style={{backgroundColor: (shotsontarget/shots* 100) >= 80 ? '#02fec5': (shotsontarget/shots* 100) >= 60 && (shotsontarget/shots* 100) < 80 ? '#a8fe02' : (shotsontarget/shots* 100) >= 40 && (shotsontarget/shots* 100) < 60 ? '#fbb206' : 'red' }}>{Math.trunc(shotsontarget/shots* 100)}</td>
                          <td>Precision</td>
                        </tr>
                        <tr>
                          <td className="stat_tier_3 stat" style={{backgroundColor: (assists/matches*90) >= 90 ? '#02fec5': (assists/matches*90) >= 80 && (assists/matches*90) < 90 ? '#a8fe02' : (assists/matches*90) >= 70 && (assists/matches*90) < 80 ? '#fbb206' : 'red' }}>{Math.trunc(assists/matches*90)}</td>
                          <td>Asistidor</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="stats-block">
                    <h4>
                      <span className="stat_tier_2 stat" style={{backgroundColor: AD >= 90 ? '#02fec5': AD >= 80 && AD < 90 ? '#a8fe02' : AD >= 70 && AD < 80 ? '#fbb206' : 'red' }}>{Math.trunc(AD)}</span>
                      Aptitud Defensiva
                    </h4>
                    <div className="star-bar">
                      <div className="stat_tier_2" style={{width: 91}}></div>
                    </div>
                    <table className="player-stats-modern">
                      <tbody>
                        <tr>
                          <td className="stat_tier_3 stat" style={{backgroundColor: (interceptions/matches) >= 15 ? '#02fec5': interceptions/matches >= 10 && interceptions/matches < 15 ? '#a8fe02' : interceptions/matches >= 5 && interceptions/matches < 10 ? '#fbb206' : 'red' }}>{Math.trunc(interceptions/matches*5.4)}</td>
                          <td>Recuperacion de Pelota</td>
                        </tr>
                        <tr>
                          <td className="stat_tier_3 stat" style={{backgroundColor: tacklescompleted/tackles*100 >= 25 ? '#02fec5': tacklescompleted/tackles*100 >= 20 && tacklescompleted/tackles*100 < 25 ? '#a8fe02' : tacklescompleted/tackles*100 >= 15 && tacklescompleted/tackles*100 < 20 ? '#fbb206' : 'red' }}>{Math.trunc(tacklescompleted/tackles*100)}%</td>
                          <td>Efectividad de Entradas</td>
                        </tr>
                        <tr>
                          <td className="stat_tier_3 stat" style={{backgroundColor: tacklescompleted >= 15 ? '#02fec5': tacklescompleted >= 10 && tacklescompleted < 15 ? '#a8fe02' : tacklescompleted >= 5 && tacklescompleted < 10 ? '#fbb206' : 'red' }}>{Math.trunc(tacklescompleted)}</td>
                          <td>Entradas completadas</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="stats-block">
                    <h4>
                      <span className="stat_tier_2 stat" style={{backgroundColor: CC >= 90 ? '#02fec5': CC >= 80 && CC < 90 ? '#a8fe02' : CC >= 70 && CC < 80 ? '#fbb206' : 'red' }}>{Math.trunc(CC)}</span>
                      Capacidad Creativa
                    </h4>
                    <div className="star-bar">
                      <div className="stat_tier_2" style={{width: 91}}></div>
                    </div>
                    <table className="player-stats-modern">
                      <tbody>
                        <tr>
                          <td className="stat_tier_3 stat" style={{backgroundColor: (passescompleted/matches*5) >= 90 ? '#02fec5': (passescompleted/matches*5) >= 80 && (passescompleted/matches*5) < 90 ? '#a8fe02' : (passescompleted/matches*5) >= 70 && (passescompleted/matches*5) < 80 ? '#fbb206' : 'red' }}>{Math.trunc(passescompleted/matches*5)}</td>
                          <td>Pasador</td>
                        </tr>
                        <tr>
                          <td className="stat_tier_3 stat" style={{backgroundColor: (assists/matches*90) >= 90 ? '#02fec5': (assists/matches*90) >= 80 && (assists/matches*90) < 90 ? '#a8fe02' : (assists/matches*90) >= 70 && (assists/matches*90) < 80 ? '#fbb206' : 'red' }}>{Math.trunc(assists/matches*90)}</td>
                          <td>Asistidor</td>
                        </tr>
                        <tr>
                          <td className="stat_tier_3 stat" style={{backgroundColor: possession >= 12 ? '#02fec5': possession >= 8 && possession < 12 ? '#a8fe02' : possession >= 5 && possession < 8 ? '#fbb206' : 'red' }}>{Math.trunc(possession*7)}</td>
                          <td>Posesion</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
        <>
        <img src={avatar}></img>
        </>
        
      </div>
        
    </div>
    )

}

export default Card