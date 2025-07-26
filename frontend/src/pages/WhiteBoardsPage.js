import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { fetchBoardsForUser } from '../services/apiService';
import BoardItem from '../components/BoardItem';
import CreateNewBoard from '../components/CreateNewBoard';
import AppHeader from '../components/AppHeader';

export const WhiteBoardsPage = () => {

    const userId = localStorage.getItem('userId');
    
    const [isCreateNewBoardPage, setIsCreateNewBoardPage] = useState(false);
    const [boards, setBoards] = useState([]);

    useEffect(() => {
      const fetchDataAsync = async () => {
        try {
          const responseData = await fetchBoardsForUser(userId);
          console.log(responseData);
          setBoards(responseData.respBoard);
        } catch (error) {
          // setError(error.message);
          console.log(`error while loading boads for user : ${error}`);
        }
      };
  
      fetchDataAsync();
    }, []);

    function handleToggleNewBoard() {
      setIsCreateNewBoardPage(!isCreateNewBoardPage)
    }
    
    return (
      <div>
        <AppHeader />
        <Grid container spacing={2} sx={{ padding: '20px' }}>
          <Grid item xs={12} md={12}>
            {!isCreateNewBoardPage && <Button variant="contained" onClick={handleToggleNewBoard}>Create New Board</Button>}
          </Grid>

          {!isCreateNewBoardPage && boards.map((board) => (
              <BoardItem key={board._id} boardId={board._id} name={board.boardTitle} description={board.boardDescription}
                role={board.role}
                memberCnt={board.members.length}
                lastAccessedAt={board.lastAccessedAt} />
          ))}

          {isCreateNewBoardPage && <CreateNewBoard canBtnHandler={handleToggleNewBoard} />}
        
        </Grid>
      </div>
    );
}
