
module mod1{

interface ClockInterface {
  time:Date
}

class Clock implements ClockInterface  {
  time: Date;
  constructor(h: number, m: number) { };
}

}
