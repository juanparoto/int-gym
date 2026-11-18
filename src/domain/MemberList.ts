import type { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

  updateFee(_documentId: string, _fee: number): void {
    for (const member of this.#items) {
      if (member.documentId === _documentId) {
        member.monthlyFee = _fee;
        return;
      }
    }
    throw new Error("No se ha encontrado el socio");
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    let total: number = 0;
    for (const member of this.#items) {
      total =
        total + member.monthlyFee - member.monthlyFee * (member.discount / 100);
    }
    return total;
  }
}
