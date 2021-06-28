 let i = 0;
 function sendData() {
    
                
    if(i < 5) {
      console.log('wassup')
      i++;
        setTimeout(() =>{
          sendData();
        },2000)

    }
    console.log('done')
  }

  async function calibrate() {
    
    sendData();
    
  }

  calibrate()