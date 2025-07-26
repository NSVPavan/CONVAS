import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import EditBoardDialog from './EditBoardDialog';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { deleteBoardById } from '../services/apiService';

const BoardItem = ({ boardId, name, description, role, memberCnt, lastAccessedAt }) => {

    const navigate = useNavigate();

    const [openEditDialog, setOpenEditDialog] = useState(false); 
    const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
    const [openOpenBoardConfirmDialog, setOpenOpenBoardConfirmDialog] = useState(false);

    const handleEditClick = () => {
        setOpenEditDialog(true); 
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleOpenBoard = () => {
        console.log(`handleOpenBoard called... for ${boardId}`)
        setOpenOpenBoardConfirmDialog(true);
    };

    const handleOpenBoardConfirm = () => {
        console.log(`handleOpenBoardConfirm called...`);
        localStorage.setItem('boardId', boardId)
        navigate(`../whiteboard/${boardId}`)
    }

    const handleDeleteBoard = () => {
        console.log(`handleDeleteBoard called...`);
        setOpenDeleteConfirmDialog(true);
    };
    
    const handleDeleteClose = () => {
        console.log(`handleDeleteClose called...`);
        setOpenDeleteConfirmDialog(false);
    };

    const handleDeleteBoardConfirm = async () => {
        console.log(`handleDeleteBoardConfirm called...`);

        try {
            const responseData = await deleteBoardById(boardId); 
            console.log(responseData);

            window.location.reload();
            setOpenDeleteConfirmDialog(false)
        } catch (error) {
            console.log(`error while deleting board : ${error}`);
        }
    }

    const handleCloseOpenBoardDialog = () => {
        console.log(`handleCloseOpenBoardDialog called...`);
        setOpenOpenBoardConfirmDialog(false);
    };

    return (
        <Grid item xs={4}>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div">
                                {name}
                            </Typography>
                            <Typography variant="body2">{description}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack direction="row" spacing={1}>
                                {(role === 'EDITOR' || role === 'OWNER') && 
                                    <Button variant="outlined" color='error' startIcon={<DeleteIcon />} onClick={handleDeleteBoard}>
                                        Delete
                                    </Button>}
                                <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={handleOpenBoard}>
                                    Open
                                </Button>
                                {(role === 'EDITOR' || role === 'OWNER') && 
                                    <Button variant="outlined" startIcon={<EditIcon />}  onClick={handleEditClick}>
                                        Edit
                                    </Button>}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" className='mt-5'>
                                <Typography variant="body3"> 
                                    <span className='f-bold'>Role: </span> {role} 
                                </Typography>
                                <Typography variant="body3"> 
                                    <span className='f-bold ml-20'>Members: </span> {memberCnt} 
                                </Typography>
                                <Typography variant="body3"> 
                                    <span className='f-bold ml-20'>Last accessed at:</span> { lastAccessedAt === null ? 'you haven\'t accessed yet.' : new Date().toDateString()} 
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <EditBoardDialog open={openEditDialog} handleClose={handleCloseEditDialog} /> 
            <ConfirmModal
                open={openDeleteConfirmDialog}
                title="Delete Confirmation"
                content="Are you sure you want to delete this item?"
                onConfirm={handleDeleteBoardConfirm}
                onClose={handleDeleteClose}
            />
            <ConfirmModal
                open={openOpenBoardConfirmDialog}
                title="Open Board Confirmation"
                content="Are you sure you want to open this board?"
                onConfirm={handleOpenBoardConfirm}
                onClose={handleCloseOpenBoardDialog}
            />
        </Grid>
    );      
};

export default BoardItem;
