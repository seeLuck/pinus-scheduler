import { Job } from "./job";

/**
 * This is the tirgger that use an object as trigger.
 */
let SKIP_OLD_JOB = false;

/**
 * The constructor of simple trigger
 */
export class SimpleTrigger 
{
    nextTime: number; //Date token
    period: number;
    count: number;
    job: Job;
    constructor(trigger: {start?:number, period?:number, count?:number}, job: Job)
    {
        this.nextTime = (!!trigger.start) ? trigger.start : Date.now();

        //The rec
        this.period = (!!trigger.period) ? trigger.period : -1;

        //The running count of the job, -1 means no limit
        this.count = (!!trigger.count) ? trigger.count : -1;

        this.job = job;
    };

    /**
     * Get the current excuteTime of rigger
     */
    excuteTime()
    {
        return this.nextTime;
    };

    /**
     * Get the next excuteTime of the trigger, and set the trigger's excuteTime
     * @return Next excute time
     */
    nextExcuteTime()
    {
        let period = this.period;

        if ((this.count > 0 && this.count <= this.job.runTime) || period <= 0)
            return null;

        this.nextTime += period;

        if (SKIP_OLD_JOB && this.nextTime < Date.now())
        {
            this.nextTime += Math.floor((Date.now() - this.nextTime) / period) * period;
        }

        return this.nextTime;
    };
}
/**
 * Create Simple trigger
 */
export function createTrigger(trigger: {start?:number, period?:number, count?:number}, job: Job)
{
    return new SimpleTrigger(trigger, job);
}
