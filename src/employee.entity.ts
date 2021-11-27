import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Task } from './task.entity';
import { type } from 'os';
import { Meeting } from './meeting.entity';


@Entity()
export class Employee
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Employee, employee => employee.directReports,
        {onDelete: 'SET NULL'})
    manager: Employee;

    @OneToMany(type => Employee, employee => employee.manager)
    directReports: Employee[];

    @OneToOne(type => ContactInfo, contactInfo => contactInfo.employee)
    contactInfo: ContactInfo;


    @OneToMany(type => Task, task => task.employee)
    tasks: Task[];

    @ManyToMany(type => Meeting, meeting => meeting.attendees)
    @JoinTable()
    meetings: Meeting[]
}