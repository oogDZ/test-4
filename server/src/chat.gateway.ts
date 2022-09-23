import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
let drivers = [
  {
    id: 1,
    vechicleId: null,
    name: 'Frozen Yogurt',
  },
  {
    id: 2,
    vechicleId: null,
    name: 'Ice cream sandwich',
  },
  {
    id: 3,
    vechicleId: null,
    name: 'Eclair',
  },
  {
    id: 4,
    vechicleId: null,
    name: 'Cupcake',
  },
  {
    id: 5,
    vechicleId: null,
    name: 'Gingerbread',
  },
  {
    id: 6,
    vechicleId: null,
    name: 'Jelly bean',
  },
  {
    id: 7,
    vechicleId: null,
    name: 'Lollipop',
  },
  {
    id: 8,
    vechicleId: null,
    name: 'Honeycomb',
  },
  {
    id: 9,
    vechicleId: null,
    name: 'Donut',
  },
  {
    id: 10,
    vechicleId: null,
    name: 'KitKat',
  },
];
var vechicles = [
  {
    id: 1,
    name: 'Frozen qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqYogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    driverId: null,
  },
  {
    id: 2,
    name: 'Ice cream sanqqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwdwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    driverId: null,
  },
  {
    id: 3,
    name: 'Ecleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    driverId: null,
  },
  {
    id: 4,
    name: 'Cupcarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrke',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    driverId: null,
  },
  {
    id: 5,
    name: 'Gingerbttttttttttttttttttttttttttttttttttttttttttttttread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    driverId: null,
  },
  {
    id: 6,
    name: 'Jelly byyyyyyyyyyyyyyyyyyyyyyyyyyyyean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    driverId: null,
  },
  {
    id: 7,
    name: 'Lolliuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuupop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    driverId: null,
  },
  {
    id: 8,
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    driverId: null,
  },
  {
    id: 9,
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    driverId: null,
  },
  {
    id: 10,
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    driverId: null,
  },
];
@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('getDrivers')
  getDrivers(@MessageBody() message: any): void {
    console.log(message);
    this.server.emit('getDrivers', { data: drivers });
  }
  @SubscribeMessage('setDrivers')
  setDrivers(@MessageBody() message: any): void {
    const { data } = message;
    drivers = data;
    //this.server.emit('setDriver', { data: { done: true } });
  }
  @SubscribeMessage('getVechicles')
  getVechicles(@MessageBody() message: any): void {
    console.log(message);
    this.server.emit('getVechicles', { data: vechicles });
  }
  @SubscribeMessage('setVechicles')
  setVechicles(@MessageBody() message: any): void {
    const { data } = message;
    vechicles = data;
    //this.server.emit('getVechicles', { data: vechicles });
  }
}
