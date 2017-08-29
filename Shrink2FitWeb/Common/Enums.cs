using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Shrink2FitWeb.Common
{
    public enum Roles
    {
        Client = 1,
        Admin = 2
    }

    public enum FutureObligation
    {
        Future = 1,
        Obligation = 2
    }

    public enum MailType
    {

        LostPassword = 5,
        NewRegister = 6,
        NewOrder = 7,
        PaymentRecieved = 8,
        OrdersCalculated = 9,
        NewOrderUser = 10,
        UserHasNoEmail = 11,
        UserMessage = 13,
        ClientRecoverPassword = 14,
        PaymentReciept = 15,
        NewOrderWithNoPayment = 17
    }

    public enum OrderStatus
    {
        New = 1,
        Paid = 2,
        Sent = 3,
        Calculated = 4,
        Complete = 5

    }

    public enum MessageSubjects
    {
        [Description("מידע כללי")]
        general = 1,
        [Description("התחברות למערכת")]
        connection = 2,
        [Description("הזמנה חדשה")]
        NewOrder = 3,
        [Description("צפייה בתוצאות")]
        Results = 4,
        [Description("ביצוע תשלום")]
        Payment = 5,
        [Description("חשבון אישי")]
        Personal = 6,
        [Description("אחר")]
        Other = 7
    }

    public static class EnumExtensions
    {
        public static string ToDescription(this Enum value)
        {
            var enumType = value.GetType();
            var field = enumType.GetField(value.ToString());
            var attributes = field.GetCustomAttributes(typeof(DescriptionAttribute),
                                                       false);
            return attributes.Length == 0
                ? value.ToString()
                : ((DescriptionAttribute)attributes[0]).Description;
        }
    }
}