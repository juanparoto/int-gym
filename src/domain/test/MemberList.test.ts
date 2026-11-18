import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
      discount: 20,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("update fees", () => {
    list.add(member);
    list.updateFee(member.documentId, 3000);
    expect(member.monthlyFee).toBe(3000);
  });

  test("update fees failed", () => {
    expect(()=>(list.updateFee(member.documentId, 3000))).toThrow();
  });

  test("update fees failed not empty", () => {
    list.add(member);
    expect(()=>(list.updateFee("56497742", 3000))).toThrow();
  });

  test("total discounted", ()=>{
    list.add(member);
    expect(list.totalDiscounted()).toBe(1200);
  })
});
