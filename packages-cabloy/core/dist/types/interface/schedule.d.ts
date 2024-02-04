import bull from 'bullmq';
export interface IScheduleJobContext {
    job: bull.Job;
    data: {
        subdomain: string;
        module: string;
        name: string;
    };
    queueNameSub: string | undefined;
}
//# sourceMappingURL=schedule.d.ts.map