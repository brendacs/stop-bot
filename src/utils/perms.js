export const isAdmin = (msg) => {
  checkNull(msg);
  let admin = msg.member.hasPermission('ADMINISTRATOR');
  return admin;
};

export const isMod = (msg) => {
  checkNull(msg);
  let mod = msg.member.hasPermission('MANAGE_MESSAGES');
  return mod;
};

// insert null member into cache
export const checkNull = (msg) => {
  if (msg.member == null) {
    msg.guild.fetchMember(msg.author, true);
  }
};
