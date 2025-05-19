import { CooldownEntry, CooldownResult } from '../Types';

export class Cooldown {
  private cooldown: number;
  private cooldownList: CooldownEntry[];

  constructor(cooldown: number) {
    this.cooldown = cooldown;
    this.cooldownList = [];
    this.find = this.find.bind(this);
    this.pushId = this.pushId.bind(this);
    this.hold = this.hold.bind(this);
    this.check = this.check.bind(this);
  }

  private find(id: string): CooldownEntry | undefined {
    return this.cooldownList.find((entry) => entry._id === id);
  }

  private pushId(id: string): void {
    this.cooldownList.push({ _id: id, timer: Date.now() });
  }

  public hold(id: string, delay: number = 3000): CooldownResult {
    const entry = this.find(id);
    if (!entry) {
      this.pushId(id);
      return { state: false };
    }
    if (Date.now() - entry.timer < this.cooldown - delay) {
      return { state: true };
    }
    if (Math.max(0, this.cooldown - delay - (Date.now() - entry.timer)) < 15000) {
      entry.timer = Date.now();
      return { state: false };
    }
    return { state: false };
  }

  public check(id: string): CooldownResult {
    const entry = this.find(id);
    if (!entry) {
      return { state: false };
    }
    if (Date.now() - entry.timer < this.cooldown - 3000) {
      return { state: true };
    }
    if (Math.max(0, this.cooldown - 3000 - (Date.now() - entry.timer)) < 15000) {
      return { state: false };
    }
    return { state: false };
  }
}
