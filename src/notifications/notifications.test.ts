import { mock, mockClear } from "jest-mock-extended";
import { NotificationsApi } from ".";
import { HttpClient } from "../http-client";
import { NotificationCreated } from "./types/notification-create.type";
import { NotificationUpdated } from "./types/notification-update.type";

describe("Notifications", () => {
  describe("Notifications create", () => {
    let notifications: NotificationsApi;
    let httpClient: HttpClient;

    const website: NotificationCreated["payload"]["website"] = {
      id: "123",
      domain: "oo://example.com:8042/over/there?name=ferret#nose",
      language: "en",
    };
    const client: NotificationCreated["payload"]["client"] = {
      id: "123",
      email: "denis@gmail.com",
    };
    const payload: NotificationCreated["payload"] = {
      packageId: "8e0ed0e5-c307-412b-9f7e-739d95c9b9f5",
      website,
      client,
    };

    const goodNotificationsCreateObject: NotificationCreated = {
      type: "SUBSCRIPTION_CREATED",
      payload,
    };

    beforeEach(() => {
      httpClient = mock<HttpClient>();

      notifications = new NotificationsApi(httpClient);
    });

    afterEach(() => {
      mockClear(httpClient);
    });

    it("should not throw if good payload is provided", async () => {
      await notifications.notify(goodNotificationsCreateObject);

      expect(httpClient.post).toHaveBeenCalled();
    });

    it("should throw an error when an invalid uuid is provided as packageId", async () => {
      const notify = notifications.notify({
        ...goodNotificationsCreateObject,
        payload: {
          ...payload,
          packageId: "definetlyNotUUID",
        },
      });

      await expect(notify).rejects.toThrowError(
        '"payload.packageId" must be a valid GUID'
      );
    });

    it("should throw an error when an invalid domain name is provided", async () => {
      const notify = notifications.notify({
        ...goodNotificationsCreateObject,
        payload: {
          ...payload,
          website: {
            ...website,
            domain: "notAnURI",
          },
        },
      });

      await expect(notify).rejects.toThrowError(
        '"payload.website.domain" must be a valid uri'
      );
    });

    it("should throw an error when invalid user email is provided", async () => {
      const notify = notifications.notify({
        ...goodNotificationsCreateObject,
        payload: {
          ...payload,
          client: {
            ...client,
            email: "notAnEmail",
          },
        },
      });

      await expect(notify).rejects.toThrowError(
        '"payload.client.email" must be a valid email'
      );
    });
  });

  describe("Notifications update", () => {
    const type: NotificationUpdated["type"] = "SUBSCRIPTION_UPDATED";
    const payload: NotificationUpdated["payload"] = {
      packageId: "8e0ed0e5-c307-412b-9f7e-739d95c9b9f5",
      website: {
        id: "456",
      },
    };
    let notifications: NotificationsApi;
    let httpClient: HttpClient;

    beforeEach(() => {
      httpClient = mock<HttpClient>();

      notifications = new NotificationsApi(httpClient);
    });

    afterEach(() => {
      mockClear(httpClient);
    });

    it("should not throw an error when expected payload is provided", async () => {
      await notifications.notify({
        type,
        payload,
      });

      expect(httpClient.post).toHaveBeenCalled();
    });
  });
});
