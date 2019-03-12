import React from 'react'
import './faceRecognition.css'


	const FaceRecognition = ({imageUrl, box }) =>{

	const style = {

		top: box.topRow, 
		right: box.rightCol, 
		bottom: box.bottomRow, 
		left: box.leftCol
	}

	
	
	

		return(

			<div className="center ma imgbox">
				<div className=" mt2 absolute ">
					<img id='inputimage' src = {imageUrl} alt = 'face recogniced' className = 'tc' width='500px' height='auto' />
					<div className='bounding-box' style={style}>
					</div>
				</div>
			</div>
			
			) 
	}

export default FaceRecognition