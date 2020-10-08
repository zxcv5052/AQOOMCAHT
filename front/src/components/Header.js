import React from 'react';

const Header = () => {
    if(true){
        return (
            <div className ="header">
                <div className=""> Logo </div>

                <div> Group </div>
                <div> Function </div>

                <div> 사용자 </div>
            </div>
        )
    }else{
        return (
            <div className ="header">
                <div> Logo </div>

                <div> Group </div>
                <div> Function </div>
                
                <div> 로그인 창</div>
            </div>
        )
    }
}

export default Header;