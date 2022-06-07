import React, { useEffect } from 'react';
import './home.scss'
import {Button} from 'antd';
import { Bounce, Zoom } from 'react-reveal';
import {Fade, Roll , Reveal} from 'react-reveal';
import {Link} from 'react-router-dom'

const Home = () => {

  window.onbeforeunload = function(event) {
    alert("alert")
  };

  return (
    <div className='Home__Container'>
    <div className='Home_top'>
      <h1 className='Home_top_heading'><Roll>Hi there!</Roll></h1>
      <p className='Home_top_para'>We're glad you're here. Take a look around and get to know our team of leadership coaches. We look forward to connecting with you!</p>
    </div>
    <div className='Home_middle'>
      <div className='home_middle_container'>
      <div className='home_middle_container_left'>
        <h1 className='home_middle_headering'>
           <Fade>Group Coaching</Fade> 
        </h1>
        <p className='home_middle_para_1'>
          If you are part of a small or large group that wants to break through barriers, exceed goals, and unlock their full potential as a team, or if you are an individual who wants to connect with a group of people with similar values and beliefs who will cheer on your success, group coaching is for you! 
          Group coaching can be completely individualized based on your teams unique challenges, goals and objectives.
          </p>        
        </div>   
        <div className='home_middle_container_right'>
            <Zoom>
               <img className='home_middle_image' src="https://d1aettbyeyfilo.cloudfront.net/lynannweaver/17721478_1615172223JPmteam_hands_in.webp" alt="" />
             </Zoom>
             <div className='home_middle_container_right_button_group'>             
             <div className='home_middle_container_right_button'> 
             <Button><Link to="quiz">Latest quiz</Link></Button>
              </div>
              <div className='home_middle_container_right_button'> 
                <Button><Link to="blog">Read Articles</Link></Button>
              </div>
              <div className='home_middle_container_right_button'> 
              <Button><Link to="/pdf">Notes</Link></Button>              
              </div>
              <div className='home_middle_container_right_button'> 
              <Button><Link to="/chat">Join Group Chat</Link></Button>              
              </div>                          
              <div className='home_middle_container_right_button'> 
              <Button><Link to="/videos">Videos</Link></Button>              
              </div>
              <div className='home_middle_container_right_button'> 
              <Button><Link to="/dashboard">dashboard</Link></Button>              
              </div>
             </div>             
         </div>   
     </div>
    </div>
    <div className='Home_page_title'>
      <Reveal effect="fadeInUp" >
      <h1>A good coach can change the game.</h1>
       <h1>A great coach can change your life.</h1>
       </Reveal>
    </div>

    <div className='Home_page_bio_images_container'>

     <Fade left>
      <div className='Home_page_bio_image'>        
           <img className='home_middle_image' src="https://hosbeg.com/wp-content/uploads/2018/04/online-study.jpeg" alt="" />
      </div>
      </Fade>

      <Fade left>
      <div className='Home_page_bio_image'>
           <img className='home_middle_image' src="https://th.bing.com/th/id/OIP.H0_f30h7CoTG3yTGppIEsgHaDk?pid=ImgDet&w=705&h=340&rs=1" alt="" />
      </div>
      </Fade>

      <Fade right>
      <div className='Home_page_bio_image'>
           <img className='home_middle_image' src="https://blog-digital.aakash.ac.in/wp-content/uploads/2018/10/online-education.png" alt="" />
      </div>
      </Fade>

    </div>

    <div className='Home_page_bio_owner_image'>
      <div className='Home_page_bio_owner_image_left'>        
          <Bounce left>
          <p className='Home_page_bio_owner_image_left_contain'>
          Saving the truth from becoming a casualty of war is the job of New York-based editor Rhona Tarrant and her 
          colleagues at the verification agency Storyful. Rhona chatted to Ryan Tubridy about the about the different kinds 
          of fake content on social media and how to spot them. She also talked about how the big tech companies in the US are 
          reacting to the spread of misinformation about the conflict in Ukraine.
          </p>
          </Bounce>
      </div>
      <div className='Home_page_bio_owner_image_right'>
       <Zoom><img src="https://cdn.pixabay.com/photo/2015/07/11/19/23/book-841171_960_720.jpg" alt="" /></Zoom>
       <p className='Home_page_bio_owner_image_right_title'><span>founder </span>:- rahul kushwah</p>
       </div>
    </div>
    </div>
  );
}
export default Home;
