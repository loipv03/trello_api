import User from "../model/user";

const cronSchedule = async () => {
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

    try {
        const result = await User.deleteMany({ isActive: false, createdAt: { $lt: twoMinutesAgo } });
        console.log(`Đã xóa ${result.deletedCount} user chưa activate sau 1 ngày.`);
    } catch (error) {
        console.error('Error deleting inactive users:', error);
    }
}

export default cronSchedule