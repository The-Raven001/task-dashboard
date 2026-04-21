from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from sqlalchemy.orm import Session
from app import models, schemas
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/tasks-groups", tags=["Task Groups"])

@router.post("/", 
    response_model=schemas.TaskGroup,
    status_code=201, 
    summary="Create group of tasks.", 
    description="Create a group of tasks to keep them better organized." )
def create_group(group: schemas.TaskGroupCreate, db:Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_group = models.TaskGroup(
        name=group.name,
        owner_id=current_user.id
    )
    db.add(new_group)
    db.commit()
    db.refresh(new_group)
    return new_group


@router.get("/",  
    response_model=list[schemas.TaskGroup],
    status_code=200,
    summary="Retrieve group of tasks.",
    description="Retrieve all groups of tasks owned by the logged user."
    )
def get_groups(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.TaskGroup).filter(
        models.TaskGroup.owner_id == current_user.id
    ).all()


@router.get("/{id}", 
    response_model=schemas.TaskGroup,
    status_code=200,
    summary="Retrieve a specific group of tasks",
    description="Retrieve a specific group of tasks given by the id and owned by the logged user."
    )
def get_group_individually(
    id:int,
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user), 
    ):

    task_group = db.query(models.TaskGroup).filter(
        models.TaskGroup.id == id, 
        models.TaskGroup.owner_id == current_user.id).first()

    if not task_group:
        raise HTTPException(status_code=404, detail="Task group not found.")

    return task_group

@router.put("/{id}", 
    response_model=schemas.TaskGroup,
    status_code=201,
    summary="Update a specific group of tasks.",
    description="Update a given group of tasks of the logged user."
    )
def update_task_group_name(
    id: int,
    updated_task_group: schemas.TaskGroupCreate,
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)):

    group = db.query(models.TaskGroup).filter(
        models.TaskGroup.id == id,
        models.TaskGroup.owner_id == current_user.id
    ).first()

    if not group:
        raise HTTPException(status_code=404, detail="Task group not found")

    group.name = updated_task_group.name

    db.commit()
    db.refresh(group)
    return group

    

@router.delete("/{id}", 
    status_code=204,
    summary="Delete a group of tasks",
    description="Delete a given group of tasks onwed by the logged user and assigned the remaining tasks to the general dashboard."
    )
def delete_groups(
    id: int, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)):

    group = db.query(models.TaskGroup).filter(
        models.TaskGroup.id == id,
        models.TaskGroup.owner_id == current_user.id
    ).first()

    if not group:
        raise HTTPException(status_code=404, detail="Task group not found")

    tasks = db.query(models.Task).filter(models.Task.group_id == id).all()
    for task in tasks:
        task.group_id = None

    db.delete(group)
    db.commit()
    return {"message": "Task group has been deleted succesfully"}