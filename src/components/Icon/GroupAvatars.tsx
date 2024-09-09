import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export interface Artist {
    name:string;
    imageSrc:string;
}
interface GroupAvatarProps{
    artists:Artist[];
}
const GroupAvatars : React.FC<GroupAvatarProps>=({artists})=> {
    return(
        <AvatarGroup max={4}>
            {artists.map((artists,index)=>(
                <Avatar key ={index} alt={artists.name} src={artists.imageSrc}/>
            ))}
            </AvatarGroup>
       
    );
};
export default GroupAvatars;